import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MaxIDs } from '../model/maxIDs';

@Injectable()
export class DatabaseService {
    private maxID: MaxIDs;

    private bCanAdd: BehaviorSubject<boolean>;

    constructor(private fire: FirebaseService) {
        this.bCanAdd = new BehaviorSubject<boolean>(false);
        this.getMaxIDs();
    }

    private getMaxIDs() {
        this.fire.db().ref('maxids').once('value', (snapshot) => {
            if (snapshot.val() == null) { this.createMaxIDs(); } else {
                this.maxID = snapshot.val();
                this.maxID = Object.assign(new MaxIDs, this.maxID); // to dziala do pojedynczego obiektu jak i do tablicy obiektow
                // this.maxID = Object.setPrototypeOf(this.maxID, MaxIDs.prototype); //ustawia prototyp, dziala tylko dla jednego obiektu
                // console.log(this.maxID);

                this.bCanAdd.next(true);
                this.bCanAdd.complete();
            }
        });
    }

    private createMaxIDs() {
        this.maxID = new MaxIDs();
        this.maxID.idNotatka = 0;
        this.updateMaxIDs();

        this.bCanAdd.next(true);
        this.bCanAdd.complete();
    }

    private updateMaxIDs() {
        this.fire.db().ref('maxids').set(this.maxID);
    }

    private deleteId(table: string, data: any): number | string {
        // usuwamy ID w trakcie zapisywania do bazy danych (id jest kluczem, a nie polem)
        const ret = data.id;
        delete data.id;
        return ret;
    }

    private restoreId(table: string, data: any, id: number | string): void { // po odczytaniu danych zapisujemy ich ID
        data.id = id;
    }

    public updateData(table: string, id: number | string, data: any): void {
        const lastId = this.deleteId(table, data);
        this.fire.db().ref(table + '/' + id).set(data);
        this.restoreId(table, data, lastId);
    }

    public addData(table: string, data: any): void {
        if (this.bCanAdd.isStopped) {
            this.addDataPriv(table, data);
        } else {
            this.bCanAdd.subscribe((canAdd) => {// oczekuj na mozliwosc dodania (az wczytaja sie maxID)
                if (canAdd) {
                    this.addDataPriv(table, data);
                }
            });
        }
    }

    private addDataPriv(table: string, data: any): void {
        let id = 0;

        if (table === TABLE_NOTATKI) {
            id = this.maxID.idNotatka++;
        }

        this.deleteId(table, data);

        this.updateMaxIDs(); // aktualizuj w bazie nowe max id

        let sciezka = table + '/' + id;

        this.fire.db().ref(sciezka).set(data);

        this.restoreId(table, data, id);
    }


    public readList(table: string, isOnce: boolean): Observable<any> {// isOnce - czy pobieramy to jeden raz, czy subskrybujemy?
        const ret = new Observable(observer => {
            const ref = this.fire.db().ref(table);
            if (!isOnce) {
                ref.on('value', (snapshot) => {
                    observer.next(snapshot.val());
                });
            } else {
                ref.once('value', (snapshot) => {
                    observer.next(snapshot.val());
                    observer.complete();
                });
            }
        });

        return ret;
    }

    public readById(table: string, id: number | string, isOnce: boolean): Observable<any> {
        // isOnce - czy pobieramy to jeden raz, czy subskrybujemy?
        const ret = new Observable(observer => {
            const ref = this.fire.db().ref(table + '/' + id);
            if (!isOnce) {
                ref.on('value', (snapshot) => {
                    observer.next(snapshot.val());
                });
            } else {
                ref.once('value', (snapshot) => {
                    observer.next(snapshot.val());
                    observer.complete();
                });
            }
        });

        return ret;
    }

    public deleteById(table: string, id: number | string) {
        this.fire.db().ref(table + '/' + id).remove();
    }
}

export const TABLE_NOTATKI = 'notatki';

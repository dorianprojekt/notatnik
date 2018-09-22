import { Injectable } from '@angular/core';
import { DatabaseService, TABLE_NOTATKI } from './database.service';
import { Notatka } from '../model/notatka';
import { Observable } from 'rxjs';

@Injectable()
export class NotatkiService {

    constructor(private db: DatabaseService) {

    }


    public add(item: Notatka): void {
        this.db.addData(TABLE_NOTATKI, item);
    }

    public update(item: Notatka): void {
        this.db.updateData(TABLE_NOTATKI, item.id, item);
    }

    public deleteByItem(item: Notatka) {
        this.db.deleteById(TABLE_NOTATKI, item.id);
    }

    public deleteById(id: number) {
        this.db.deleteById(TABLE_NOTATKI, id);
    }

    public getList(uid: string): Promise<Notatka[]> {
        return this.getListObs(uid, true).toPromise();
    }

    public getListObs(uid: string, isOnce: boolean): Observable<Notatka[]> {// isOnce - czy pobieramy raz liste, czy subskrybujemy
        const ret = new Observable<Notatka[]>(observer => {
            const sub = this.db.readList(TABLE_NOTATKI, isOnce).subscribe(val => {
                const tab = [];

                if (val) {
                    const entries = Object.entries(val);
                    for (let i = 0; i < entries.length; i++) {
                        const u = Object.assign(new Notatka, entries[i][1]);
                        u.id = Number(entries[i][0]);
                        if(u.userId==uid) tab.push(u);
                    }
                }

                observer.next(tab);
                if (isOnce) {
                    observer.complete();
                }
            });
        });
        return ret;
    }

    public getById(id: number):Promise<Notatka>{
        return this.getByIdObs(id, true).toPromise();
    }

    public getByIdObs(id: number, isOnce: boolean):Observable<Notatka>{
        let ret = new Observable<Notatka>(observer => {
            this.db.readById(TABLE_NOTATKI, id, isOnce).subscribe(val => {
                if(val) {
                    val = Object.assign(new Notatka, val);
                    val.id = id;
                }

                observer.next(val);
                if(isOnce) {
                    observer.complete();
                }
            });
        });
        return ret;
    }


}

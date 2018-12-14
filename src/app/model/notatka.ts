export class Notatka {//dane naszej firmy
    public id: number;
    public userId: string;
    public nazwa: string;
    public tresc: string;
    public data: string;

    constructor(){
        this.id = -1;
        this.userId = '';
        this.nazwa = '';
        this.tresc = '';
        this.data = '';
    }

    public setCurrentDate():void{
        let d = new Date();
        this.data = this.getFullDateMonthValue(d.getDate()) + '.' + this.getFullDateMonthValue(d.getMonth()+1) + '.' + d.getFullYear() + ' ' + this.getFullDateMonthValue(d.getHours()) + ':' + this.getFullDateMonthValue(d.getMinutes());
    }

    private getFullDateMonthValue(n: number):string{
        return ((n>9)? '' : '0')+n;
    }
}



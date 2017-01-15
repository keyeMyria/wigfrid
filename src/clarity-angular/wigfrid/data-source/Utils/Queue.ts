import { Subject, Observable } from "rxjs";
/**
 * Created by LeBlanc on 16/8/13.
 */


export class Queue {
    private _busy;

    private _subject = new Subject();
    private _queueStream;

    constructor() {
        this._queueStream = this._subject.filter(_ =>!this._busy)
            .map(_ =>_.do(_ =>this._busy = true, _ =>this._busy = false, () =>this._busy = false))
            .mergeAll()
            .subscribe();
    }


    public add(observable: Observable) {
        this._subject.next(observable);
    }

    public busy() {
        return this._busy;
    }
}

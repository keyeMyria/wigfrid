import { Observable } from "rxjs";
/**
 * Created by LeBlanc on 16/8/13.
 */
export declare class Queue {
    private _busy;
    private _subject;
    private _queueStream;
    constructor();
    add(observable: Observable): void;
    busy(): any;
}

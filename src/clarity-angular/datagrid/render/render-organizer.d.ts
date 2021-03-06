import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs";
export declare class DatagridRenderOrganizer {
    widths: {
        px: number;
        strict: boolean;
    }[];
    protected _clearWidths: Subject<any>;
    readonly clearWidths: Observable<any>;
    protected _tableMode: Subject<boolean>;
    readonly tableMode: Observable<boolean>;
    protected _computeWidths: Subject<any>;
    readonly computeWidths: Observable<any>;
    protected _alignColumns: Subject<any>;
    readonly alignColumns: Observable<any>;
    scrollbar: Subject<any>;
    scrollbarWidth: Subject<number>;
    resize(): void;
}

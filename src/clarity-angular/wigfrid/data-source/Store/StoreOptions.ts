import { LoadOptions } from "../LoadOptions";
/**
 * Created by LeBlanc on 16/8/19.
 */

export class StoreOptions {

    public onModified;
    public onModifying;
    public onRemoved;
    public onRemoving;
    public onUpdated;
    public onUpdating;
    public onLoaded;
    public onLoading;
    public onInserted;
    public onInserting;
    public errorHandler;
    public key;

    constructor({
        onModified,
        onModifying,
        onRemoved,
        onRemoving,
        onUpdated,
        onUpdating,
        onLoaded,
        onLoading,
        onInserted,
        onInserting,
        errorHandler,
        key
    }: {
        /** A handler for the modified event. */
        onModified?: () => void;
        /** A handler for the modifying event. */
        onModifying?: () => void;
        /** A handler for the removed event. */
        onRemoved?: (key: any) => void;
        /** A handler for the removing event. */
        onRemoving?: (key: any) => void;
        /** A handler for the updated event. */
        onUpdated?: (key: any, values: Object) => void;
        /** A handler for the updating event. */
        onUpdating?: (key: any, values: Object) => void;
        /** A handler for the loaded event. */
        onLoaded?: (result: Array<any>) => void;
        /** A handler for the loading event. */
        onLoading?: (loadOptions: LoadOptions) => void;
        /** A handler for the inserted event. */
        onInserted?: (values: Object, key: any) => void;
        /** A handler for the inserting event. */
        onInserting?: (values: Object) => void;
        /** Specifies the function called when the Store causes an error. */
        errorHandler?: (e: Error) => void;
        /** Specifies the key properties within the data associated with the Store. */
        key?: any;
    }) {
        this.onModified   = onModified;
        this.onModifying  = onModifying;
        this.onRemoved    = onRemoved;
        this.onRemoving   = onRemoving;
        this.onUpdated    = onUpdated;
        this.onUpdating   = onUpdating;
        this.onLoaded     = onLoaded;
        this.onLoading    = onLoading;
        this.onInserted   = onInserted;
        this.onInserting  = onInserting;
        this.errorHandler = errorHandler;
        this.key          = key;
    }
}

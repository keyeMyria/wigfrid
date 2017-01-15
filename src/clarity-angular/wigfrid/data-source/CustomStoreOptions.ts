/**
 * Created by LeBlanc on 16/8/24.
 */

export class CustomStoreOptions {
    constructor({useDefaultSearch, byKey, insert, load, remove, totalCount, update}:
        {
            useDefaultSearch?: boolean;
            /** The user implementation of the byKey(key, extraOptions) method. */
            byKey?: (key: any) => Promise<any>;
            /** The user implementation of the insert(values) method. */
            insert?: (values: Object) => Promise<any>;
            /** The user implementation of the load(options) method. */
            load?: (options?: {
              filter?: Object;
              sort?: Object;
              select?: Object;
              expand?: Object;
              group?: Object;
              skip?: number;
              take?: number;
              userData?: Object;
              requireTotalCount?: boolean;
            }) => Promise<any>;
            /** The user implementation of the remove(key) method. */
            remove?: (key: any) => Promise<any>;
            /** The user implementation of the totalCount(options) method. */
            totalCount?: (options?: {
                filter?: Object;
                group?: Object;
            }) => Promise<any>;
            /** The user implementation of the update(key, values) method. */
            update?: (key: any, values: Object) => Promise<any>;
        }) {

    }
}

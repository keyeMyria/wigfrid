import { DataSourceOptions } from "./DataSourceOptions";
import { CustomStoreOptions } from "./Store/CommonStore/CommonStoreOptions";
export declare function isPending(deferred: any): boolean;
export declare function normalizeDataSourceOptions(options: any): CustomStoreOptions | DataSourceOptions;
export declare function normalizeStoreLoadOptionAccessorArguments(originalArguments: any): any;
export declare function generateStoreLoadOptionAccessor(optionName: any): () => any;
export declare function mapDataRespectingGrouping(items: any, mapper: any, groupInfo: any): any;

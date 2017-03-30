export declare let utils: {
    normalizeBinaryCriterion: (crit: any) => any[];
    normalizeSortingInfo: (info: any) => any;
    errorMessageFromXhr: (xhr: any, textStatus: any) => any;
    aggregators: {
        count: {
            seed: number;
            step: (count: any) => any;
        };
        sum: {
            seed: number;
            step: (sum: any, item: any) => any;
        };
        min: {
            step: (min: any, item: any) => any;
        };
        max: {
            step: (max: any, item: any) => any;
        };
        avg: {
            seed: number[];
            step: (pair: any, value: any) => any[];
            finalize: (pair: any) => number;
        };
    };
    keysEqual: (keyExpr: any, key1: any, key2: any) => boolean;
    isDisjunctiveOperator: (condition: any) => boolean;
    isConjunctiveOperator: (condition: any) => boolean;
    processRequestResultLock: {
        obtain: () => void;
        release: () => void;
        promise: () => any;
        reset: () => void;
    };
    base64_encode: (input: any) => string;
};

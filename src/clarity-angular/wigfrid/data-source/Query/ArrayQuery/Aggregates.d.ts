export declare let Aggregators: {
    count: {
        seed: number;
        reducer: (count: any) => any;
    };
    sum: {
        seed: number;
        reducer: (sum: any, item: any) => any;
    };
    min: {
        reducer: (min: any, item: any) => any;
    };
    max: {
        reducer: (max: any, item: any) => any;
    };
    avg: {
        seed: number[];
        reducer: (pair: any, value: any) => any[];
        finalize: (pair: any) => number;
    };
};

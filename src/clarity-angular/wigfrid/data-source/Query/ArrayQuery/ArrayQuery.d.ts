import { Observable } from "rxjs";
import { Criteria } from "../Criteria/Criteria";
export declare class ArrayQuery {
    protected iter: any;
    protected queryOptions: {
        errorHandler?: Function;
    };
    constructor(iter: any, queryOptions?: {
        errorHandler?: Function;
    });
    private toArray();
    enumerate(): Observable;
    sortBy(sortDescriptions: any[]): any;
    thenBy(getter: any, desc: any): ArrayQuery;
    filter(predicate: any): ArrayQuery;
    slice(skip: any, take: any): ArrayQuery;
    groupBy(getter: any): ArrayQuery;
    select(getter: any): ArrayQuery;
    aggregate(seed: any, reducer: any, finalize: any): any;
    count(): any;
    sum(getter?: any): any;
    min(getter?: any): any;
    max(getter?: any): any;
    avg(getter?: any): any;
    private handleError(error);
    private aggregateCore(aggregator);
    private standardAggregate(name);
    private selectProp(name);
    matching(criteria: Criteria): any;
}

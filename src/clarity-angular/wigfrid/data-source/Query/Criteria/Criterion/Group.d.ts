import { Criterion } from "../Criteria";
export declare class Group {
    groupBy(groups: any): any;
}
export declare class GroupBy implements Criterion {
    private field;
    constructor(field: any);
    getField(): any;
    visit(): void;
}

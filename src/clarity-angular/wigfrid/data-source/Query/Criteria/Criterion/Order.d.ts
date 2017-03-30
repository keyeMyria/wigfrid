import { Criterion } from "../Criteria";
import { AbstractCriterionVisitor } from "./AbstractCriterionVisitor";
export declare class Order {
    asc(field: any): OrderBy;
    desc(field: any): OrderBy;
}
export declare class OrderBy implements Criterion {
    private field;
    private value;
    constructor(field: any, value: any);
    getField(): any;
    getValue(): any;
    visit(visitor: AbstractCriterionVisitor): any;
}

import { AbstractCriterionVisitor } from "./Criterion/AbstractCriterionVisitor";
import { OrderBy } from "./Criterion/Order";
import { GroupBy } from "./Criterion/Group";
export declare class Criteria {
    private restriction;
    private orderEntries;
    private groupEntries;
    static create(): Criteria;
    private _firstResult;
    firstResult: any;
    private _maxResults;
    maxResults: any;
    constructor(restriction?: Criterion, orderings?: Criterion[], groups?: Criterion[], firstResult?: any, maxResults?: any);
    where(restriction: Criterion): this;
    orWhere(restriction: Criterion): this;
    /**
     * [
     *     ['field1', 'ASC'],
     *     ['field2', 'DESC']
     * ]
     *
     * @param orders
     */
    orderBy(...orders: any[]): this;
    groupBy(...groups: any[]): this;
    replaceWhere(criterion: Criterion): this;
    addOrder(orderBy: OrderBy): void;
    addGroup(groupBy: GroupBy): void;
    getWhereExpression(): any;
    getOrderExpression(): any[];
    getGroupExpression(): any[];
}
export interface Criterion {
    visit(visitor: AbstractCriterionVisitor): any;
}

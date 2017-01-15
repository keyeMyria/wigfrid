import { AbstractCriterionVisitor } from "./Criterion/AbstractCriterionVisitor";
import { OrderBy } from "./Criterion/Order";
import { CompositeExpression } from "./Criterion/Restrictions";
import { GroupBy } from "./Criterion/Group";
export class Criteria {
    private restriction;

    private orderEntries = [];

    private groupEntries = [];

    public static create() {
        return new Criteria();
    }

    private _firstResult;
    get firstResult() {
        return this._firstResult;
    }

    set firstResult(value) {
        this._firstResult = value;
    }

    private _maxResults;
    get maxResults() {
        return this._maxResults;
    }

    set maxResults(value) {
        this._maxResults = value;
    }

    constructor(restriction: Criterion = null,
                orderings: Criterion[] = null,
                groups: Criterion[] = null,
                firstResult = null,
                maxResults = null) {
        this.restriction = restriction;

        this.firstResult = firstResult;
        this.maxResults  = maxResults;

        if (null !== orderings) {
            this.orderBy(orderings);
        }
    }

    where(restriction: Criterion) {
        if (this.restriction === null) {
            this.restriction = restriction;
        }

        this.restriction = new CompositeExpression(CompositeExpression.TYPE_AND, [
            this.restriction, restriction
        ]);

        return this;
    }

    orWhere(restriction: Criterion) {
        if (this.restriction === null) {
            this.restriction = restriction;
        }

        this.restriction = new CompositeExpression(CompositeExpression.TYPE_OR, [
            this.restriction, restriction
        ]);

        return this;
    }

    /**
     * [
     *     ['field1', 'ASC'],
     *     ['field2', 'DESC']
     * ]
     *
     * @param orders
     */
    orderBy(...orders) {
        for (let order of orders) {
            this.orderEntries.push(new OrderBy(order[0], order[1]))
        }
        return this;
    }

    groupBy(...groups) {
        for (let group of groups) {
            this.groupEntries.push(new GroupBy(group))
        }
        return this;
    }


    replaceWhere(criterion: Criterion) {
        return this.where(criterion);
    }


    addOrder(orderBy: OrderBy) {
        this.orderEntries.push(orderBy);
    }

    addGroup(groupBy: GroupBy) {
        this.groupEntries.push(groupBy)
    }

    // [$$iterator](){
    //
    // }


    getWhereExpression() {
        return this.restriction;
    }

    getOrderExpression() {
        return this.orderEntries;
    }

    getGroupExpression() {
        return this.groupEntries;
    }
}

export interface Criterion {
    visit(visitor: AbstractCriterionVisitor);
}

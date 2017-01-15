
import { Criterion } from "../Criteria";
import { Getter, Literal } from "./Restrictions";
import { AbstractCriterionVisitor } from "./AbstractCriterionVisitor";
export class Order {
    public asc(field) {
        return new OrderBy(field, true);
    }

    public desc(field) {
        return new OrderBy(field, false);
    }
}

export class OrderBy implements Criterion {
    private field;

    private value;

    constructor(field, value) {
        this.field = new Getter(field);
        this.value = new Literal(value);
    }

    public getField() {
        return this.field;
    }

    public getValue() {
        return this.value;
    }

    visit(visitor: AbstractCriterionVisitor) {
        return visitor.walkOrderBy(this);
    }
}

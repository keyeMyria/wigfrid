import { Criterion } from "../Criteria";
import { AbstractCriterionVisitor } from "./AbstractCriterionVisitor";
export class Restrictions {

    public and(...x) {
        return new CompositeExpression(CompositeExpression.TYPE_AND, x);
    }

    public or(...x) {
        return new CompositeExpression(CompositeExpression.TYPE_OR, x);
    }

    public eq(field, value) {
        return new Comparison(field, Comparison.EQ, value);
    }

    public eqProperty(fieldLhs, fieldRhs) {
        return new ComparisonProperty(fieldLhs, ComparisonProperty.EQ, fieldRhs);
    }

    public gt(field, value) {
        return new Comparison(field, Comparison.GT, value);
    }

    public gtProperty(fieldLhs, fieldRhs) {
        return new ComparisonProperty(fieldLhs, ComparisonProperty.GT, fieldRhs);
    }

    public lt(field, value) {
        return new Comparison(field, Comparison.LT, value);
    }

    public ltProperty(fieldLhs, fieldRhs) {
        return new ComparisonProperty(fieldLhs, ComparisonProperty.LT, fieldRhs);
    }

    public gte(field, value) {
        return new Comparison(field, Comparison.GTE, value);
    }

    public gteProperty(fieldLhs, fieldRhs) {
        return new ComparisonProperty(fieldLhs, ComparisonProperty.GTE, fieldRhs);
    }

    public lte(field, value) {
        return new Comparison(field, Comparison.LTE, value);
    }

    public lteProperty(fieldLhs, fieldRhs) {
        return new ComparisonProperty(fieldLhs, ComparisonProperty.LTE, fieldRhs);
    }

    public neq(field, value) {
        return new Comparison(field, Comparison.NEQ, value);
    }

    public neqProperty(fieldLhs, fieldRhs) {
        return new ComparisonProperty(fieldLhs, ComparisonProperty.NEQ, fieldRhs);
    }

    public isNull(field) {
        return new Comparison(field, Comparison.EQ, null);
    }

    public in(field, values) {
        return new Comparison(field, Comparison.IN, values);
    }

    public notIn(field, values: Array) {
        return new Comparison(field, Comparison.NIN, values);
    }

    public contains(field, value) {
        return new Comparison(field, Comparison.CONTAINS, value);
    }

    // public startswith(field, value) {
    //     return new Comparison(field, Comparison.STARTSWITH, new LiteralPrimitive(value));
    // }
    //
    // public endswith(field, value) {
    //     return new Comparison(field, Comparison.ENDSWITH, new LiteralPrimitive(value));
    // }

}

export class Literal implements Criterion {


    private value;

    public constructor(value) {
        this.value = value;
    }

    public getValue() {
        return this.value;
    }

    public visit(visitor: AbstractCriterionVisitor) {
        return visitor.walkLiteral(this);
    }

    public toString() {
        return this.value;
    }
}

export class Comparison implements Criterion<Comparison> {
    static EQ       = '=';
    static NEQ      = '<>';
    static LT       = '<';
    static LTE      = '<=';
    static GT       = '>';
    static GTE      = '>=';
    static IS       = '='; // no difference with EQ
    static IN       = 'IN';
    static NIN      = 'NIN';
    static CONTAINS = 'CONTAINS';
    // static STARTSWITH = 'startswith';
    // static ENDSWITH   = 'endswith';

    private field;

    private op;

    /**
     * @var Value
     */
    private value;

    public constructor(field, operator, value) {
        if (!(value instanceof Literal)) {
            value = new Literal(value);
        }

        this.field = new Getter(field);
        this.op    = operator;
        this.value = value;
    }

    public getField() {
        return this.field;
    }

    public getValue() {
        return this.value;
    }

    public getOperator() {
        return this.op;
    }

    public visit(visitor: AbstractCriterionVisitor) {
        return visitor.walkComparison(this);
    }
}

export class ComparisonProperty implements Criterion {
    static EQ       = '=';
    static NEQ      = '<>';
    static LT       = '<';
    static LTE      = '<=';
    static GT       = '>';
    static GTE      = '>=';
    static IS       = '='; // no difference with EQ
    static IN       = 'IN';
    static NIN      = 'NIN';
    static CONTAINS = 'CONTAINS';

    private lhs;

    private operator;

    private rhs;

    constructor(lhs, op, rhs) {
        this.lhs      = new Getter(lhs);
        this.operator = op;
        this.rhs      = new Getter(rhs);
    }

    public getFieldLhs() {
        return this.lhs;
    }

    public getFieldRhs() {
        return this.rhs;
    }

    public getOperator() {
        return this.operator;
    }

    public visit(visitor: AbstractCriterionVisitor) {
        return visitor.walkComparisonProperty(this);
    }
}

export class CompositeExpression implements Criterion {
    static TYPE_AND = 'AND';
    static TYPE_OR  = 'OR';

    private type;

    private expressions: Criterion[] = [];

    public constructor(type, expressions: Criterion[]) {
        this.type = type;

        for (let expr of expressions) {
            if (expr instanceof Literal) {
                throw new Error("Values are not supported expressions as children of and/or expressions.");
            }
            // if(!(expr instanceof Expression)) {
            //     throw new Error("No expression given to CompositeExpression.");
            // }

            this.expressions.push(expr);
        }
    }

    public getExpressionList() {
        return this.expressions;
    }

    public getType() {
        return this.type;
    }

    public visit(visitor: AbstractCriterionVisitor) {
        return visitor.walkCompositeExpression(this);
    }
}

export class Getter {
    private getter;

    constructor(name: string) {
        this.getter = name;
    }

    public getGetter() {
        return this.getter;
    }

    public visit(visitor: AbstractCriterionVisitor) {
        return visitor.walkGetter(this);
    }
}


import { Criterion } from "../Criteria";
import { AbstractCriterionVisitor } from "./AbstractCriterionVisitor";
export declare class Restrictions {
    and(...x: any[]): CompositeExpression;
    or(...x: any[]): CompositeExpression;
    eq(field: any, value: any): Comparison;
    eqProperty(fieldLhs: any, fieldRhs: any): ComparisonProperty;
    gt(field: any, value: any): Comparison;
    gtProperty(fieldLhs: any, fieldRhs: any): ComparisonProperty;
    lt(field: any, value: any): Comparison;
    ltProperty(fieldLhs: any, fieldRhs: any): ComparisonProperty;
    gte(field: any, value: any): Comparison;
    gteProperty(fieldLhs: any, fieldRhs: any): ComparisonProperty;
    lte(field: any, value: any): Comparison;
    lteProperty(fieldLhs: any, fieldRhs: any): ComparisonProperty;
    neq(field: any, value: any): Comparison;
    neqProperty(fieldLhs: any, fieldRhs: any): ComparisonProperty;
    isNull(field: any): Comparison;
    in(field: any, values: any): Comparison;
    notIn(field: any, values: Array): Comparison;
    contains(field: any, value: any): Comparison;
}
export declare class Literal implements Criterion {
    private value;
    constructor(value: any);
    getValue(): any;
    visit(visitor: AbstractCriterionVisitor): any;
    toString(): any;
}
export declare class Comparison implements Criterion<Comparison> {
    static EQ: string;
    static NEQ: string;
    static LT: string;
    static LTE: string;
    static GT: string;
    static GTE: string;
    static IS: string;
    static IN: string;
    static NIN: string;
    static CONTAINS: string;
    private field;
    private op;
    /**
     * @var Value
     */
    private value;
    constructor(field: any, operator: any, value: any);
    getField(): any;
    getValue(): any;
    getOperator(): any;
    visit(visitor: AbstractCriterionVisitor): any;
}
export declare class ComparisonProperty implements Criterion {
    static EQ: string;
    static NEQ: string;
    static LT: string;
    static LTE: string;
    static GT: string;
    static GTE: string;
    static IS: string;
    static IN: string;
    static NIN: string;
    static CONTAINS: string;
    private lhs;
    private operator;
    private rhs;
    constructor(lhs: any, op: any, rhs: any);
    getFieldLhs(): any;
    getFieldRhs(): any;
    getOperator(): any;
    visit(visitor: AbstractCriterionVisitor): any;
}
export declare class CompositeExpression implements Criterion {
    static TYPE_AND: string;
    static TYPE_OR: string;
    private type;
    private expressions;
    constructor(type: any, expressions: Criterion[]);
    getExpressionList(): Criterion[];
    getType(): any;
    visit(visitor: AbstractCriterionVisitor): any;
}
export declare class Getter {
    private getter;
    constructor(name: string);
    getGetter(): any;
    visit(visitor: AbstractCriterionVisitor): any;
}

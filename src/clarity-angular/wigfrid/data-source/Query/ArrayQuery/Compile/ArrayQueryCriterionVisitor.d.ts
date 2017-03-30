import * as e from "../../Query/Compile/Output/OutputAST";
import { AbstractCriterionVisitor } from "../../Criteria/Criterion/AbstractCriterionVisitor";
import { CompileCriterion } from "./CompileCriterion";
import { Comparison, Literal, Getter, ComparisonProperty, CompositeExpression } from "../../Criteria/Criterion/Restrictions";
import { OrderBy } from "../../Criteria/Criterion/Order";
/**
 * generate a closure filter func array
 */
export declare class ArrayQueryCriterionVisitor extends AbstractCriterionVisitor {
    compileCriterion: CompileCriterion;
    constructor(compileCriterion: CompileCriterion);
    walkComparison(comparison: Comparison): e.InvokeMethodExpr;
    walkComparisonProperty(comparison: ComparisonProperty): e.InvokeMethodExpr;
    walkLiteral(value: Literal): e.LiteralExpr;
    walkGetter(expr: Getter): e.ReadPropExpr | e.InvokeFunctionExpr;
    /**
     * turn
     * ```
     * and expression
     *  - expression1
     *  - expression2
     *  - expression3
     *  - expression4
     * ```
     *
     * ```
     * BinaryOperatorExpr(And)
     *  - expression1
     *  - BinaryOperatorExpr(And)
     *    - expression2
     *    - BinaryOperatorExpr(And)
     *      - expression3
     *      - expression4
     * ```
     *
     */
    walkCompositeExpression(expr: CompositeExpression): any;
    private _getBinarayOperatorMap(comparisonOperator);
    walkOrderBy(expr: OrderBy): void;
}

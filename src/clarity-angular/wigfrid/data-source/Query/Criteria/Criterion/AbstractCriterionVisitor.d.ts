import { Comparison, ComparisonProperty, Literal, CompositeExpression, Getter } from "./Restrictions";
import { OrderBy } from "./Order";
import { Criterion } from "../Criteria";
export declare abstract class AbstractCriterionVisitor {
    abstract walkComparison(comparison: Comparison): any;
    abstract walkComparisonProperty(comparison: ComparisonProperty): any;
    abstract walkLiteral(value: Literal): any;
    abstract walkCompositeExpression(expr: CompositeExpression): any;
    abstract walkGetter(expr: Getter): any;
    abstract walkOrderBy(expr: OrderBy): any;
    /**
     * @deprecated
     * @param expr
     * @returns {any}
     */
    dispatch(expr: Criterion): any;
}

import { Comparison, ComparisonProperty, Literal, CompositeExpression, Getter } from "./Restrictions";
import { OrderBy } from "./Order";
import { Criterion } from "../Criteria";

export abstract class AbstractCriterionVisitor {
    public abstract walkComparison(comparison: Comparison);

    public abstract walkComparisonProperty(comparison: ComparisonProperty);

    public abstract walkLiteral(value: Literal);

    public abstract walkCompositeExpression(expr: CompositeExpression);

    public abstract walkGetter(expr: Getter);

    public abstract walkOrderBy(expr: OrderBy);

    /**
     * @deprecated
     * @param expr
     * @returns {any}
     */
    public dispatch(expr: Criterion) {
        switch (true) {
            case (expr instanceof Comparison):
                return this.walkComparison(<Comparison>expr);

            case (expr instanceof Literal):
                return this.walkLiteral(<Literal>expr);

            case (expr instanceof CompositeExpression):
                return this.walkCompositeExpression(<CompositeExpression>expr);

            default:
                throw new Error(`Unknown Expression ${expr.toString()}`);
        }
    }

    // public walk(exprs: Criterion[]) {
    //     let results = [];
    //     for (let expr of exprs) {
    //         results.push(expr.visit(this));
    //     }
    //     return results;
    // }
}

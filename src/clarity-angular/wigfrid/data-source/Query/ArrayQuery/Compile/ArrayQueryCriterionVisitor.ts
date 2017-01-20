import * as e from "../../Query/Compile/Output/OutputAST";
import { BinaryOperatorExpr, LiteralExpr, ReadVarExpr, BinaryOperator } from "../../Query/Compile/Output/OutputAST";
import { CriterionClass } from "./Constants";
import { AbstractCriterionVisitor } from "../../Criteria/Criterion/AbstractCriterionVisitor";
import * as _ from "lodash";
import { CompileCriterion, CompileMethod } from "./CompileCriterion";
import {
    Comparison,
    Literal,
    Getter,
    ComparisonProperty,
    CompositeExpression
} from "../../Criteria/Criterion/Restrictions";
import { OrderBy } from "../../Criteria/Criterion/Order";
import { ReturnStatement } from "../../Query/Compile/Output/OutputAST";
/**
 * generate a closure filter func array
 */
export class ArrayQueryCriterionVisitor extends AbstractCriterionVisitor {


    public compileCriterion: CompileCriterion;

    constructor(compileCriterion: CompileCriterion) {
        super();
        this.compileCriterion = compileCriterion;
    }

    walkComparison(comparison: Comparison) {
        let lhsExpression = comparison.getField().visit(this);
        let rhsExpression = comparison.getValue().visit(this);

        let operator = this._getBinarayOperatorMap(comparison.getOperator());

        let expr                    = new BinaryOperatorExpr(
            operator,
            lhsExpression,
            rhsExpression
        );
        let comparisonCompileMethod = new CompileMethod();
        comparisonCompileMethod.addStmt(new ReturnStatement(expr));
        this.compileCriterion.comparisonMethods.push(comparisonCompileMethod);
        let indexExpr = this.compileCriterion.comparisonMethods.indexOf(comparisonCompileMethod);
        return e.THIS_EXPR.callMethod(`_comparison_${indexExpr}`, [new e.ReadVarExpr(CriterionClass.filterTarget.name)]);
    }

    walkComparisonProperty(comparison: ComparisonProperty) {
        let lhsExpression = comparison.getFieldLhs().visit(this);
        let rhsExpression = comparison.getFieldRhs().visit(this);

        let operator = this._getBinarayOperatorMap(comparison.getOperator());

        let expr             = new BinaryOperatorExpr(
            operator,
            lhsExpression,
            rhsExpression
        );
        let comparisonCompileMethod = new CompileMethod();
        comparisonCompileMethod.addStmt(new ReturnStatement(expr));
        this.compileCriterion.comparisonMethods.push();
        let indexExpr = this.compileCriterion.comparisonMethods.indexOf(comparisonCompileMethod);
        return e.THIS_EXPR.callMethod(`_comparison_${indexExpr}`, [new e.ReadVarExpr(CriterionClass.filterTarget.name)]);

    }

    walkLiteral(value: Literal) {
        return new LiteralExpr(value.getValue());
    }

    walkGetter(expr: Getter) {
        let getter = expr.getGetter();
        if (_.isFunction(getter)) {
            //添加依赖项
            let importExpr = this.compileCriterion.addGetterDependence(getter);
            return importExpr.callFn([e.variable(CriterionClass.filterTarget.name)]);
        }

        return e.variable(CriterionClass.filterTarget.name).prop(expr.getGetter());
    }


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
    walkCompositeExpression(expr: CompositeExpression) {
        let expressions = expr.getExpressionList();
        if (expressions.length < 2) {
            throw new Error(`the composite expression should not have two expression at least`);
        }
        let compiledExpressions = expressions.map(expression => expression.visit(this));

        let rhs               = compiledExpressions.pop();
        let lhs               = compiledExpressions.pop();
        let currentExpression = new BinaryOperatorExpr(
            BinaryOperator.And,
            lhs,
            rhs
        );
        while (compiledExpressions.length > 0) {
            currentExpression = new BinaryOperatorExpr(
                BinaryOperator.And,
                compiledExpressions.pop(),
                currentExpression
            )
        }

        return currentExpression;
    }

    private _getBinarayOperatorMap(comparisonOperator) {
        let operator;
        switch (comparisonOperator) {
            case Comparison.EQ:
                operator = BinaryOperator.Equals;
                break;
            case Comparison.NEQ:
                operator = BinaryOperator.NotEquals;
                break;
            case Comparison.LT:
                operator = BinaryOperator.Lower;
                break;
            case Comparison.LTE:
                operator = BinaryOperator.LowerEquals;
                break;
            case Comparison.GT:
                operator = BinaryOperator.Bigger;
                break;
            case Comparison.GTE:
                operator = BinaryOperator.BiggerEquals;
                break;
            case Comparison.IS:
                throw new Error('cant support right now');
                // break;
            case Comparison.IN:
                throw new Error('cant support right now');
                // break;
            case Comparison.NIN:
                throw new Error('cant support right now');
                // break;
            case Comparison.CONTAINS:
                throw new Error('cant support right now');
                // break;
            default:
                throw new Error('cant support right now');
        }
        return operator;
    }

    walkOrderBy(expr: OrderBy) {
        let getter = expr.getField().visit(this);
        let value  = expr.getValue().visit(this);
        this.compileCriterion.sortDescriptions.push([getter, value])
    }

    // public walk(exprs: Criterion[]) {
    //     let execStat = super.walk(exprs);
    //     this.compileCriterion.filterMethod.push(execStat);
    // }
}

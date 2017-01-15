import { CompileCriterion } from "./CompileCriterion";
import { Criteria, Criterion } from "../../Criteria/Criteria";
import { jitStatements } from "../../Query/Compile/Output/JitEmitter";
import { CriterionClass } from "./Constants";
import { AbstractCriterionVisitor } from "../../Criteria/Criterion/AbstractCriterionVisitor";
import { ArrayQueryCriterionVisitor } from "./ArrayQueryCriterionVisitor";
import { ReturnStatement, literalArr } from "../../Query/Compile/Output/OutputAST";
export class CriterionCompiler {

    /**
     * the criterionCompiler instance should belongs to the whole program, but right here we use static to solve this
     */
    static criteriaStore = [];

    constructor() {

    }

    compileCritera(criteria: Criteria) {
        let whereExpression  = criteria.getWhereExpression();
        let orderExpressions = criteria.getOrderExpression();
        let groupExpressions = criteria.getGroupExpression();

        let compileCriterion           = new CompileCriterion();
        let arrayQueryCriterionVisitor = new ArrayQueryCriterionVisitor(compileCriterion);

        this.buildCriterion(whereExpression, arrayQueryCriterionVisitor);

        this.buildOrder(orderExpressions, arrayQueryCriterionVisitor);

        this.buildGroup(groupExpressions, arrayQueryCriterionVisitor);
        // console.log(compileCriterion.generate());


        let jit = jitStatements(this.parseCriteriaName(criteria), compileCriterion.generate(), CriterionClass.className.name);
        // var converter = new AbstractJsEmitterVisitor();
        // var ctx = EmitterVisitorContext.createRoot(['result']);
        // converter.visitAllStatements(compileCriterion.generate(), ctx);
        //
        // console.log(ctx.toSource());
        // console.log(jit);
        return jit;
    }

    criterionVisitAll(criterions: Criterion[], criterionVisitor: AbstractCriterionVisitor) {

        return criterions.map(criterion => {
            return criterion.visit(criterionVisitor);
        })
    }


    buildCriterion(criterion: Criterion, criterionVisitor: ArrayQueryCriterionVisitor) {
        criterionVisitor.compileCriterion.filterMethod.addStmt(new ReturnStatement(criterion.visit(criterionVisitor)));
    }

    buildOrder(criterions: Criterion[], criterionVisitor: ArrayQueryCriterionVisitor) {
        // let stmts =
        this.criterionVisitAll(criterions, criterionVisitor)
        // .map(expression => {
        //     return expression.toStmt();
        // });
        // criterionVisitor.compileCriterion.orderMethod.addStmts(stmts);
    }

    /**
     * group is a array used to group target, the array item is a getter.
     * after compiled the getter is a function to handle target, the return value is different.
     *
     * such as array with two getter, first getter group target, then second group grouped target
     *
     * target:
     * ```
     * [
     *      {Region: 'Asia', Country: 'China', Province: 'Beijing'},
     *      {Region: 'Asia', Country: 'China', Province: 'ShangHai'}
     * ]
     * ```
     *
     * group:
     * ```
     * ['Region', Country]
     * ```
     *
     * result:
     * ```
     * [
     *      {
     *          getter: 'Asia'
     *          items: [
     *              {
     *                  getter: 'Asia'
     *                  items: [
     *                      {Region: 'Asia', Country: 'China', Province: 'Beijing'},
     *                      {Region: 'Asia', Country: 'China', Province: 'ShangHai'}
     *                  ]
     *              }
     *          ]
     *      }
     * ]
     * ```
     *
     */
    buildGroup(criterions: Criterion[], criterionVisitor: ArrayQueryCriterionVisitor) {
        // let stmts =
        this.criterionVisitAll(criterions, criterionVisitor)
        // .map(expression => {
        // return expression.toStmt();
        // });
        // criterionVisitor.compileCriterion.groupMethod.addStmts(stmts);
    }

    private parseCriteriaName(criteria: Criteria): string {
        let index = CriterionCompiler.criteriaStore.indexOf(criteria);
        if (index === -1) {
            CriterionCompiler.criteriaStore.push(criteria);
        }
        return `Jit_Criteria_${CriterionCompiler.criteriaStore.indexOf(criteria)}.js`;
    }
}

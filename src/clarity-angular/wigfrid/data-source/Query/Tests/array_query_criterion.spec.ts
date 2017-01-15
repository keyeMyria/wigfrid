import { Restrictions } from "../Criteria/Criterion/Restrictions";
import { CompileCriterion } from "../ArrayQuery/Compile/CompileCriterion";
import { ArrayQueryCriterionVisitor } from "../ArrayQuery/Compile/ArrayQueryCriterionVisitor";
import { EmitterVisitorContext } from "../Query/Compile/Output/AbstractEmitter";
describe('array query criterion', () => {

    it('array query criterion visit', () => {
        let r = new Restrictions();

        let criterion = r.and(
            r.eqProperty('getter1', 'getter2'),
            r.eq('getter2', 'value2'),
            r.eq('getter3', 'value3'),
        );

        let compileCriterion = new CompileCriterion();
        let criterionVisitor = new ArrayQueryCriterionVisitor(compileCriterion);

        /*let expression = */
        compileCriterion.filterMethod = criterion.visit(criterionVisitor);

        // compileCriterion.filterMethod = expression;

        // console.log(expression);

        // console.log(compileCriterion.generateComparisonMethod());

        let ctx = new EmitterVisitorContext();
        // let statement = expression.toStmt().visitStatement(
        //     new AbstractJsEmitterVisitor(),
        //     ctx
        // );

        new AbstractJsEmitterVisitor().visitAllStatements(compileCriterion.generate(), ctx);
        // jitStatements('jit_acb.js', compileCriterion.generate(), 'result');
        /**
         * result:
         * '(($target.getter1 == $target.getter2) && ($target.getter2 == 'value2'));'
         */

        let factory = new Function(ctx.toSource() + `\n//# sourceURL=abc.js `);

        let func = factory();

        let result = [
            {
                getter1: 'value2',
                getter2: 'value2',
                getter3: 'value3',
            },
            {
                getter1: 'value22',
                getter2: 'value22',
                getter3: 'value33',
            },
        ].filter(func);

        console.log(result);

        expect(result).toEqual([{
            getter1: 'value2',
            getter2: 'value2',
            getter3: 'value3',
        }])
    });

    it('array query use func', () => {
        let r = new Restrictions();

        let criterion = r.and(
            r.eq(($target) => {
                return $target.name
            }, 'value2'),
            r.eq('getter3', 'value3'),
        );

        let compileCriterion = new CompileCriterion();
        let criterionVisitor = new ArrayQueryCriterionVisitor(compileCriterion);

        /*let expression = */
        compileCriterion.filterMethod = criterion.visit(criterionVisitor);

        let ctx = new EmitterVisitorContext();

        new AbstractJsEmitterVisitor().visitAllStatements(compileCriterion.generate(), ctx);

        let factory = new Function('getters', ctx.toSource() + `\n//# sourceURL=abcd.js `);

        let func = factory(compileCriterion.getterDependencies);
    })

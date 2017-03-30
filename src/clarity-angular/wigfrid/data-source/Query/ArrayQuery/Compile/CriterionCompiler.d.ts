import { Criteria, Criterion } from "../../Criteria/Criteria";
import { AbstractCriterionVisitor } from "../../Criteria/Criterion/AbstractCriterionVisitor";
import { ArrayQueryCriterionVisitor } from "./ArrayQueryCriterionVisitor";
export declare class CriterionCompiler {
    /**
     * the criterionCompiler instance should belongs to the whole program, but right here we use static to solve this
     */
    static criteriaStore: any[];
    constructor();
    compileCritera(criteria: Criteria): any;
    criterionVisitAll(criterions: Criterion[], criterionVisitor: AbstractCriterionVisitor): any[];
    buildCriterion(criterion: Criterion, criterionVisitor: ArrayQueryCriterionVisitor): void;
    buildOrder(criterions: Criterion[], criterionVisitor: ArrayQueryCriterionVisitor): void;
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
    buildGroup(criterions: Criterion[], criterionVisitor: ArrayQueryCriterionVisitor): void;
    private parseCriteriaName(criteria);
}

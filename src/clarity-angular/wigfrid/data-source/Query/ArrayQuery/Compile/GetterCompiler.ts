
import * as _ from "lodash";
/**
 * ```
 *
 * ```
 *
 * criteria.where(
 *  restriction.eq('getter', 'value1'),
 *  restriction.eq('getter?.sub1.sub2', 'value2')
 * )
 *
 * ```
 * (target) => {
 *  return target.getter;
 * }
 *
 * (target) => {
 *  return target.getter ? target.sub1.sub2 : undefined
 * }
 * ```
 *
 */
export class GetterCompiler {

    compileGetter() {

    }

    compileGetterString(getter) {

    }

    /**
     * getter get data from target object step by step
     * combine them
     */
    compileGetterArray(getters) {

        if (arguments.length > 1) {
            let getters = _.toArray(arguments)
        }



    }
}

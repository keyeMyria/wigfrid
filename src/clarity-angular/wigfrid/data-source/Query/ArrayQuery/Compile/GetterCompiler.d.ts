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
export declare class GetterCompiler {
    compileGetter(): void;
    compileGetterString(getter: any): void;
    /**
     * getter get data from target object step by step
     * combine them
     */
    compileGetterArray(getters: any): void;
}

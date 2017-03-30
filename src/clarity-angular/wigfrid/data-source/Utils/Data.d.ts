/**
 * Created by LeBlanc on 16/8/10.
 */
export declare const bracketsToDots: (expr: any) => any;
export declare const readPropValue: (obj: any, propName: any) => any;
export declare const assignPropValue: (obj: any, propName: any, value: any, options: any) => void;
export declare const prepareOptions: (options: any) => any;
export declare const unwrap: (value: any, options: any) => any;
export declare const compileGetter: (expr: any) => any;
export declare const combineGetters: (getters: any) => (obj: any, options: any) => undefined;
export declare let compileSetter: (expr: any) => (obj: any, value: any, options: any) => void;
export declare let toComparable: (value: any, caseSensitive?: any) => any;

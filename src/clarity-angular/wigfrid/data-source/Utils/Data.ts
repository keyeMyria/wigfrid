import * as _ from "lodash";
/**
 * Created by LeBlanc on 16/8/10.
 */
export const bracketsToDots  = function (expr) {
    return expr.replace(/\[/g, ".").replace(/\]/g, "")
};
export const readPropValue   = function (obj, propName) {
    if ("this" === propName) {
        return obj
    }
    return obj[propName]
};
export const assignPropValue = function (obj, propName, value, options) {
    if ("this" === propName) {
        throw new Error("The compileSetter(expr) method is called with 'self' passed as a parameter")
    }
    const propValue = obj[propName];
    if (options.unwrapObservables && isWrapped(propValue)) {
        assign(propValue, value)
    } else {
        obj[propName] = value
    }
};
export const prepareOptions = function (options) {
    options                   = options || {};
    options.unwrapObservables = void 0 !== options.unwrapObservables ? options.unwrapObservables : true;
    return options
};
export const unwrap         = function (value, options) {
    return options.unwrapObservables ? /*unwrapVariable*/(value): value
};
export const compileGetter  = function (expr) {
    if (arguments.length > 1) {
        expr = _.toArray(arguments)
    }
    if (!expr || "this" === expr) {
        return function (obj) {
            return obj
        }
    }
    if ("string" === typeof expr) {
        expr       = bracketsToDots(expr);
        const path = expr.split(".");
        return function (obj, options) {
            options          = prepareOptions(options);
            let functionAsIs = options.functionsAsIs,
                current = unwrap(obj, options);
            for (let i = 0; i < path.length; i++) {
                if (!current) {
                    break
                }
                let next = unwrap(current[path[i]], options);
                if (!functionAsIs && _.isFunction(next)) {
                    next = next.call(current)
                }
                current = next
            }
            return current
        }
    }
    if (_.isArray(expr)) {
        return combineGetters(expr)
    }
    if (_.isFunction(expr)) {
        return expr
    }
};
export const combineGetters = function (getters) {
    const compiledGetters = {};
    let i                 = 0;
    const l               = getters.length;
    for (; i < l; i++) {
        const getter            = getters[i];
        compiledGetters[getter] = compileGetter(getter)
    }
    return function (obj, options) {
        let result;
        _.forEach(compiledGetters, function (name) {
                      let current, path, last, i;
                      const value = this(obj, options);
                      if (void 0 === value) {
                          return
                      }
                      current = result || (result = {});
                      path    = name.split(".");
                      last    = path.length - 1;
                      for (i = 0; i < last; i++) {
                          current = current[path[i]] = {}
                      }
                      current[path[i]] = value
                  }
        );
        return result
    }
};
export let compileSetter    = function (expr) {
    expr                 = expr || "this";
    expr                 = bracketsToDots(expr);
    const pos            = expr.lastIndexOf("."),
          targetGetter   = compileGetter(expr.substr(0, pos)),
          targetPropName = expr.substr(1 + pos);
    return function (obj, value, options) {
        options             = prepareOptions(options);
        const target = targetGetter(obj, {
                                        functionsAsIs: options.functionsAsIs,
                                        unwrapObservables: options.unwrapObservables
                                    }
        );
        let prevTargetValue = readPropValue(target, targetPropName);
        if (!options.functionsAsIs && _.isFunction(prevTargetValue) /*&& !isWrapped(prevTargetValue)*/) {
            target[targetPropName](value)
        } else {
            prevTargetValue = unwrap(prevTargetValue, options);
            if (options.merge && _.isPlainObject(value) && (void 0 === prevTargetValue || _.isPlainObject(prevTargetValue))) {
                if (!prevTargetValue) {
                    assignPropValue(target, targetPropName, {}, options)
                }
                _.merge(unwrap(readPropValue(target, targetPropName), options), value)
            } else {
                assignPropValue(target, targetPropName, value, options)
            }
        }
    }
};
export let toComparable   = function (value, caseSensitive?) {
    if (value instanceof Date) {
        return value.getTime()
    }
    // if (value && value instanceof Class && value.valueOf) {
    //     return value.valueOf()
    // }
    if (!caseSensitive && "string" === typeof value) {
        return value.toLowerCase()
    }
    return value
};

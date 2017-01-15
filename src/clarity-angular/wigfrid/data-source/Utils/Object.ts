/**
 * Created by LeBlanc on 16/8/2.
 */

import * as _ from 'lodash';

export let extendFromObject = function (target, source, overrideExistingValues) {
    target = target || {};
    for (let prop in source) {
        if (source.hasOwnProperty(prop)) {
            const value = source[prop];
            if (!(prop in target) || overrideExistingValues) {
                target[prop] = value
            }
        }
    }
    return target
};
export let orderEach        = function (map, func) {
    let key, i;
    const keys = [];
    for (key in map) {
        if (map.hasOwnProperty(key)) {
            keys.push(key)
        }
    }
    keys.sort(function (x, y) {
                  let isNumberX = _.isNumber(x),
                      isNumberY = _.isNumber(y);
                  if (isNumberX && isNumberY) {
                      return x - y
                  }
                  if (isNumberX && !isNumberY) {
                      return -1
                  }
                  if (!isNumberX && isNumberY) {
                      return 1
                  }
                  if (x < y) {
                      return -1
                  }
                  if (x > y) {
                      return 1
                  }
                  return 0
              }
    );
    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        func(key, map[key])
    }
};

/**
 * lodash merge
 * @param target
 * @param changes
 * @returns {any}
 */
           export const deepExtendArraySafe = function (target, changes) {
               let prevValue, newValue;
               for (let name in changes) {
                   prevValue = target[name];
                   newValue  = changes[name];
                   if (target === newValue) {
                       continue
                   }
                   if (_.isPlainObject(newValue)/* && !(newValue instanceof $.Event)*/) {
                       target[name] = deepExtendArraySafe(_.isPlainObject(prevValue) ? prevValue : {}, newValue)
                   } else {
                       if (void 0 !== newValue) {
                           target[name] = newValue
                       }
                   }
               }
               return target
           };

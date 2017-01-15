import {isDate} from "./is-date";
import {isBoolean} from "./is-boolean";
import {isNumber} from "./is-number";
import {isString} from "./is-string";

export function isPrimitive(value: any): boolean {
    return isString(value) || isNumber(value) || isBoolean(value) || isDate(value);
}

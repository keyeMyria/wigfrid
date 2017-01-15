import {DataType} from "../enum/data-type";
import {isArray} from "../lang/is-array";
import {isString} from "../lang/is-string";
import {isDate} from "../lang/is-date";
import {isBoolean} from "../lang/is-boolean";
import {isNumber} from "../lang/is-number";
/**
 * Gets the type of a value.
 *
 * @param value Value to test.
 * @return A @see:DataType value representing the type of the value passed in.
 */
export function getType(value: any): DataType {
    if (isNumber(value)) return DataType.Number;
    if (isBoolean(value)) return DataType.Boolean;
    if (isDate(value)) return DataType.Date;
    if (isString(value)) return DataType.String;
    if (isArray(value)) return DataType.Array;
    return DataType.Object;
}

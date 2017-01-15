import {assert} from "./assert";
import {isNumber} from "../lang/is-number";
/**
 * Asserts that a value is a valid setting for an enumeration.
 *
 * @param value Value supposed to be a member of the enumeration.
 * @param enumType Enumeration to test for.
 * @param nullOK Whether null values are acceptable.
 * @return The value passed in.
 */
export function asEnum(value: number, enumType: any, nullOK = false): number {
    if (value == null && nullOK) return null;
    const e = enumType[value];
    assert(e != null, 'Invalid enum value.');
    return isNumber(e) ? e : value;
}

import {assert} from "./assert";
import {isDate} from "../lang/is-date";
/**
 * Asserts that a value is a Date.
 *
 * @param value Value supposed to be a Date.
 * @param nullOK Whether null values are acceptable.
 * @return The Date passed in.
 */
export function asDate(value: Date, nullOK = false): Date {
    assert((nullOK && value == null) || isDate(value), 'Date expected.');
    return value;
}

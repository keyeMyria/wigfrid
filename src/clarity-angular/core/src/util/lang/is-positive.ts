
import {isNumber} from "./is-number";
export function isPositive(value: any): boolean {
    return isNumber(value) && value > 0;
}

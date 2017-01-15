/**
 * Rounds or truncates a number to a specified precision.
 *
 * @param value Value to round or truncate.
 * @param prec Number of decimal digits for the result.
 * @param truncate Whether to truncate or round the original value.
 */
export function toFixed(value: number, prec: number, truncate: boolean): number {
    if (truncate) {
        var s = value.toString(),
            decPos = s.indexOf('.');
        if (decPos > -1) {
            s = s.substr(0, decPos + 1 + prec);
            value = parseFloat(s);
        }
    } else {
        var s = value.toFixed(prec);
        value = parseFloat(s);
    }
    return value;
}
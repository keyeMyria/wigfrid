
export function isNullOrWhitespace(value:string) {
    return value == null ? true : value.replace(/\s/g, '').length < 1;
}

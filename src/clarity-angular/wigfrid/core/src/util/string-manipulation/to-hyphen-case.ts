
export function toHyphenCase(text: string): string {
    return text.length ? (text[0] + text.substr(1).replace(/([A-Z])/g, '-$1')).toLowerCase() : '';
}

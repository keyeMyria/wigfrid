
export function clamp(value: number, min: number, max: number): number {
    if (value != null) {
        if (max != null && value > max) value = max;
        if (min != null && value < min) value = min;
    }
    return value;
}

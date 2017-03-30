/**
 * Class that represents a point (with x and y coordinates).
 */
export declare class Point {
    /**
     * Gets or sets the x coordinate of this @see:Point.
     */
    x: number;
    /**
     * Gets or sets the y coordinate of this @see:Point.
     */
    y: number;
    /**
     * Initializes a new instance of a @see:Point object.
     *
     * @param x X coordinate of the new Point.
     * @param y Y coordinate of the new Point.
     */
    constructor(x?: number, y?: number);
    /**
     * Returns true if a @see:Point has the same coordinates as this @see:Point.
     *
     * @param pt @see:Point to compare to this @see:Point.
     */
    equals(pt: Point): boolean;
    /**
     * Creates a copy of this @see:Point.
     */
    clone(): Point;
    toString(): string;
}

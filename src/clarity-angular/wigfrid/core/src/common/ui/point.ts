import { asNumber } from "../../util/util";

/**
 * Class that represents a point (with x and y coordinates).
 */
export class Point {
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
    constructor(x: number = 0, y: number = 0) {
        this.x = asNumber(x, false, false);
        this.y = asNumber(y, false, false);
    }

    /**
     * Returns true if a @see:Point has the same coordinates as this @see:Point.
     *
     * @param pt @see:Point to compare to this @see:Point.
     */
    equals(pt: Point): boolean {
        return (pt instanceof Point) && this.x == pt.x && this.y == pt.y;
    }

    /**
     * Creates a copy of this @see:Point.
     */
    clone(): Point {
        return new Point(this.x, this.y);
    }

    toString(): string {
        return `[${this.x}, ${this.y}]`;
    }
}

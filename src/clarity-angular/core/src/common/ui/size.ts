import {asNumber} from "../../util/util";
/**
 * Class that represents a size (with width and height).
 */
export class Size {
    /**
     * Gets or sets the width of this @see:Size.
     */
    width: number;
    /**
     * Gets or sets the height of this @see:Size.
     */
    height: number;
    /**
     * Initializes a new instance of a @see:Size object.
     *
     * @param width Width of the new @see:Size.
     * @param height Height of the new @see:Size.
     */
    constructor(width = 0, height = 0) {
        this.width = asNumber(width);
        this.height = asNumber(height);
    }
    /**
     * Returns true if a @see:Size has the same dimensions as this @see:Size.
     *
     * @param sz @see:Size to compare to this @see:Size.
     */
    equals(sz: Size): boolean {
        return (sz instanceof Size) && this.width == sz.width && this.height == sz.height;
    }
    /**
     * Creates a copy of this @see:Size.
     */
    clone(): Size {
        return new Size(this.width, this.height);
    }
}

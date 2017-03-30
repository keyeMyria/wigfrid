/**
 * Class that represents a size (with width and height).
 */
export declare class Size {
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
    constructor(width?: number, height?: number);
    /**
     * Returns true if a @see:Size has the same dimensions as this @see:Size.
     *
     * @param sz @see:Size to compare to this @see:Size.
     */
    equals(sz: Size): boolean;
    /**
     * Creates a copy of this @see:Size.
     */
    clone(): Size;
}

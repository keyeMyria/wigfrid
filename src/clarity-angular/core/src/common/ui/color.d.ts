/**
 * Color class.
 *
 * The @see:Color class parses colors specified as CSS strings and exposes
 * their red, green, blue, and alpha channels as read-write properties.
 *
 * The @see:Color class also provides @see:fromHsb and @see:fromHsl methods
 * for creating colors using the HSB and HSL color models instead of RGB,
 * as well as @see:getHsb and @see:getHsl methods for retrieving the color
 * components using those color models.
 *
 * Finally, the @see:Color class provides an @see:interpolate method that
 * creates colors by interpolating between two colors using the HSL model.
 * This method is especially useful for creating color animations with the
 * @see:animate method.
 */
export declare class Color {
    _r: number;
    _g: number;
    _b: number;
    _a: number;
    /**
     * Initializes a new @see:Color from a CSS color specification.
     *
     * @param color CSS color specification.
     */
    constructor(color: string);
    /**
     * Gets or sets the red component of this @see:Color,
     * in a range from 0 to 255.
     */
    r: number;
    /**
     * Gets or sets the green component of this @see:Color,
     * in a range from 0 to 255.
     */
    g: number;
    /**
     * Gets or sets the blue component of this @see:Color,
     * in a range from 0 to 255.
     */
    b: number;
    /**
     * Gets or sets the alpha component of this @see:Color,
     * in a range from 0 to 1 (zero is transparent, one is solid).
     */
    a: number;
    /**
     * Returns true if a @see:Color has the same value as this @see:Color.
     *
     * @param clr @see:Color to compare to this @see:Color.
     */
    equals(clr: Color): boolean;
    /**
     * Gets a string representation of this @see:Color.
     */
    toString(): string;
    /**
     * Creates a new @see:Color using the specified RGBA color channel values.
     *
     * @param r Value for the red channel, from 0 to 255.
     * @param g Value for the green channel, from 0 to 255.
     * @param b Value for the blue channel, from 0 to 255.
     * @param a Value for the alpha channel, from 0 to 1.
     */
    static fromRgba(r: number, g: number, b: number, a?: number): Color;
    /**
     * Creates a new @see:Color using the specified HSB values.
     *
     * @param h Hue value, from 0 to 1.
     * @param s Saturation value, from 0 to 1.
     * @param b Brightness value, from 0 to 1.
     * @param a Alpha value, from 0 to 1.
     */
    static fromHsb(h: number, s: number, b: number, a?: number): Color;
    /**
     * Creates a new @see:Color using the specified HSL values.
     *
     * @param h Hue value, from 0 to 1.
     * @param s Saturation value, from 0 to 1.
     * @param l Lightness value, from 0 to 1.
     * @param a Alpha value, from 0 to 1.
     */
    static fromHsl(h: number, s: number, l: number, a?: number): Color;
    /**
     * Creates a new @see:Color from a CSS color string.
     *
     * @param value String containing a CSS color specification.
     * @return A new @see:Color, or null if the string cannot be parsed into a color.
     */
    static fromString(value: string): Color;
    /**
     * Gets an array with this color's HSB components.
     */
    getHsb(): number[];
    /**
     * Gets an array with this color's HSL components.
     */
    getHsl(): number[];
    /**
     * Creates a @see:Color by interpolating between two colors.
     *
     * @param c1 First color.
     * @param c2 Second color.
     * @param pct Value between zero and one that determines how close the
         * interpolation should be to the second color.
     */
    static interpolate(c1: Color, c2: Color, pct: number): Color;
    /**
     * Gets the closest opaque color to a given color.
     *
     * @param c @see:Color to be converted to an opaque color
     * (the color may also be specified as a string).
     * @param bkg Background color to use when removing the transparency
     * (defaults to white).
     */
    static toOpaque(c: any, bkg?: any): Color;
    _parse(color: string): boolean;
    /**
     * Converts an HSL color value to RGB.
     *
     * @param h The hue (between zero and one).
     * @param s The saturation (between zero and one).
     * @param l The lightness (between zero and one).
     * @return An array containing the R, G, and B values (between zero and 255).
     */
    static _hslToRgb(h: number, s: number, l: number): number[];
    static _hue2rgb(p: number, q: number, t: number): number;
    /**
     * Converts an RGB color value to HSL.
     *
     * @param r The value of the red channel (between zero and 255).
     * @param g The value of the green channel (between zero and 255).
     * @param b The value of the blue channel (between zero and 255).
     * @return An array containing the H, S, and L values (between zero and one).
     */
    static _rgbToHsl(r: number, g: number, b: number): number[];
    /**
     * Converts an RGB color value to HSB.
     *
     * @param r The value of the red channel (between zero and 255).
     * @param g The value of the green channel (between zero and 255).
     * @param b The value of the blue channel (between zero and 255).
     * @return An array containing the H, S, and B values (between zero and one).
     */
    static _rgbToHsb(r: number, g: number, b: number): number[];
    /**
     * Converts an HSB color value to RGB.
     *
     * @param h The hue (between zero and one).
     * @param s The saturation (between zero and one).
     * @param b The brightness (between zero and one).
     * @return An array containing the R, G, and B values (between zero and 255).
     */
    static _hsbToRgb(h: number, s: number, b: number): number[];
    /**
     * Converts an HSB color value to HSL.
     *
     * @param h The hue (between zero and one).
     * @param s The saturation (between zero and one).
     * @param b The brightness (between zero and one).
     * @return An array containing the H, S, and L values (between zero and one).
     */
    static _hsbToHsl(h: number, s: number, b: number): number[];
    /**
     * Converts an HSL color value to HSB.
     *
     * @param h The hue (between zero and one).
     * @param s The saturation (between zero and one).
     * @param l The lightness (between zero and one).
     * @return An array containing the H, S, and B values (between zero and one).
     */
    static _hslToHsb(h: number, s: number, l: number): number[];
}

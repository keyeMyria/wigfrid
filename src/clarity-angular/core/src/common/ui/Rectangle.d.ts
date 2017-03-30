import { Point } from "./point";
/**
 * Class that represents a rectangle (with left, top, width, and height).
 */
export declare class Rectangle {
    /**
     * Gets or sets the left coordinate of this @see:Rectangle.
     */
    x: number;
    /**
     * Gets or sets the top coordinate of this @see:Rectangle.
     */
    y: number;
    /**
     * Gets or sets the width of this @see:Rectangle.
     */
    width: number;
    /**
     * Gets or sets the height of this @see:Rectangle.
     */
    height: number;
    /**
     * Initializes a new instance of a @see:Rectangle object.
     *
     * @param x Left coordinate of the new @see:Rectangle.
     * @param y Top coordinate of the new @see:Rectangle.
     * @param width Width of the new @see:Rectangle.
     * @param height Height of the new @see:Rectangle.
     */
    constructor(x?: number, y?: number, width?: number, height?: number);
    /**
     * The sum of the <code>y</code> and <code>height</code> properties.
     */
    readonly bottom: number;
    private _bottomRight;
    /**
     * The location of the Rectangle object's bottom-right corner, determined by
     * the values of the <code>right</code> and <code>bottom</code> properties.
     */
    readonly bottomRight: Point;
    /**
     * The <i>x</i> coordinate of the top-left corner of the rectangle. Changing
     * the <code>left</code> property of a Rectangle object has no effect on the
     * <code>y</code> and <code>height</code> properties. However it does affect
     * the <code>width</code> property, whereas changing the <code>x</code> value
     * does <i>not</i> affect the <code>width</code> property.
     *
     * <p>The value of the <code>left</code> property is equal to the value of
     * the <code>x</code> property.</p>
     */
    left: number;
    /**
     * The sum of the <code>x</code> and <code>width</code> properties.
     */
    readonly right: number;
    private _size;
    /**
     * The size of the Rectangle object, expressed as a Point object with the
     * values of the <code>width</code> and <code>height</code> properties.
     */
    readonly size: Point;
    /**
     * The <i>y</i> coordinate of the top-left corner of the rectangle. Changing
     * the <code>top</code> property of a Rectangle object has no effect on the
     * <code>x</code> and <code>width</code> properties. However it does affect
     * the <code>height</code> property, whereas changing the <code>y</code>
     * value does <i>not</i> affect the <code>height</code> property.
     *
     * <p>The value of the <code>top</code> property is equal to the value of the
     * <code>y</code> property.</p>
     */
    top: number;
    private _topLeft;
    /**
     * The location of the Rectangle object's top-left corner, determined by the
     * <i>x</i> and <i>y</i> coordinates of the point.
     */
    readonly topLeft: Point;
    /**
     * Creates a copy of this @see:Rectangle.
     */
    clone(): Rectangle;
    /**
     * Creates a @see:Rectangle from <b>ClientRect</b> or <b>SVGRect</b> objects.
     *
     * @param rc Rectangle obtained by a call to the DOM's <b>getBoundingClientRect</b>
     * or <b>GetBoundingBox</b> methods.
     */
    static fromBoundingRect(rc: any): Rectangle;
    /**
     * Gets a rectangle that represents the union of two rectangles.
     *
     * @param rc1 First rectangle.
     * @param rc2 Second rectangle.
     */
    static union(rc1: Rectangle, rc2: Rectangle): Rectangle;
    /**
     * Determines whether the rectangle contains a given point or rectangle.
     *
     * @param pt The @see:Point or @see:Rectangle to ckeck.
     */
    contains(pt: any): boolean;
    /**
     * Determines whether the specified point is contained within the rectangular
     * region defined by this Rectangle object. This method is similar to the
     * <code>Rectangle.contains()</code> method, except that it takes a Point
     * object as a parameter.
     *
     * @param point The point, as represented by its <i>x</i> and <i>y</i>
     *              coordinates.
     * @return A value of <code>true</code> if the Rectangle object contains the
     *         specified point; otherwise <code>false</code>.
     */
    containsPoint(point: Point): boolean;
    /**
     * Determines whether the Rectangle object specified by the <code>rect</code>
     * parameter is contained within this Rectangle object. A Rectangle object is
     * said to contain another if the second Rectangle object falls entirely
     * within the boundaries of the first.
     *
     * @param rect The Rectangle object being checked.
     * @return A value of <code>true</code> if the Rectangle object that you
     *         specify is contained by this Rectangle object; otherwise
     *         <code>false</code>.
     */
    containsRect(rect: Rectangle): boolean;
    /**
     * Increases the size of the Rectangle object by the specified amounts, in
     * pixels. The center point of the Rectangle object stays the same, and its
     * size increases to the left and right by the <code>dx</code> value, and to
     * the top and the bottom by the <code>dy</code> value.
     *
     * @param dx The value to be added to the left and the right of the Rectangle
     *           object. The following equation is used to calculate the new
     *           width and position of the rectangle:
     * @param dy The value to be added to the top and the bottom of the
     *           Rectangle. The following equation is used to calculate the new
     *           height and position of the rectangle:
     */
    inflate(dx: number, dy: number): void;
    /**
     * Increases the size of the Rectangle object. This method is similar to the
     * <code>Rectangle.inflate()</code> method except it takes a Point object as
     * a parameter.
     *
     * <p>The following two code examples give the same result:</p>
     *
     * @param point The <code>x</code> property of this Point object is used to
     *              increase the horizontal dimension of the Rectangle object.
     *              The <code>y</code> property is used to increase the vertical
     *              dimension of the Rectangle object.
     */
    inflatePoint(point: Point): void;
    /**
     * If the Rectangle object specified in the <code>toIntersect</code>
     * parameter intersects with this Rectangle object, returns the area of
     * intersection as a Rectangle object. If the rectangles do not intersect,
     * this method returns an empty Rectangle object with its properties set to
     * 0.
     *
     * @param toIntersect The Rectangle object to compare against to see if it
     *                    intersects with this Rectangle object.
     * @return A Rectangle object that equals the area of intersection. If the
     *         rectangles do not intersect, this method returns an empty
     *         Rectangle object; that is, a rectangle with its <code>x</code>,
     *         <code>y</code>, <code>width</code>, and <code>height</code>
     *         properties set to 0.
     */
    intersection(toIntersect: Rectangle): Rectangle;
    /**
     * Determines whether the object specified in the <code>toIntersect</code>
     * parameter intersects with this Rectangle object. This method checks the
     * <code>x</code>, <code>y</code>, <code>width</code>, and
     * <code>height</code> properties of the specified Rectangle object to see if
     * it intersects with this Rectangle object.
     *
     * @param toIntersect The Rectangle object to compare against this Rectangle
     *                    object.
     * @return A value of <code>true</code> if the specified object intersects
     *         with this Rectangle object; otherwise <code>false</code>.
     */
    intersects(toIntersect: Rectangle): boolean;
    /**
     * Determines whether or not this Rectangle object is empty.
     *
     * @return A value of <code>true</code> if the Rectangle object's width or
     *         height is less than or equal to 0; otherwise <code>false</code>.
     */
    isEmpty(): boolean;
    /**
     * Adjusts the location of the Rectangle object, as determined by its
     * top-left corner, by the specified amounts.
     *
     * @param dx Moves the <i>x</i> value of the Rectangle object by this amount.
     * @param dy Moves the <i>y</i> value of the Rectangle object by this amount.
     */
    offset(dx: number, dy: number): void;
    /**
     * Adjusts the location of the Rectangle object using a Point object as a
     * parameter. This method is similar to the <code>Rectangle.offset()</code>
     * method, except that it takes a Point object as a parameter.
     *
     * @param point A Point object to use to offset this Rectangle object.
     */
    offsetPoint(point: Point): void;
    /**
     * Sets all of the Rectangle object's properties to 0. A Rectangle object is
     * empty if its width or height is less than or equal to 0.
     *
     * <p> This method sets the values of the <code>x</code>, <code>y</code>,
     * <code>width</code>, and <code>height</code> properties to 0.</p>
     *
     */
    setEmpty(): void;
}

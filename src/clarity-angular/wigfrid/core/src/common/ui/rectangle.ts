import {asNumber, assert} from "../../util/util";
import {Point} from "./point";

/**
 * Class that represents a rectangle (with left, top, width, and height).
 */
export class Rectangle {
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
    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
        this.x      = asNumber(x);
        this.y      = asNumber(y);
        this.width  = asNumber(width);
        this.height = asNumber(height);
    }

    //region get bottom left right size left leftTop
    /**
     * The sum of the <code>y</code> and <code>height</code> properties.
     */
    public get bottom(): number {
        return this.y + this.height;
    }

    private _bottomRight: Point;
    /**
     * The location of the Rectangle object's bottom-right corner, determined by
     * the values of the <code>right</code> and <code>bottom</code> properties.
     */
    public get bottomRight(): Point {
        if (this._bottomRight == null)
            this._bottomRight = new Point();
        this._bottomRight.x = this.right;
        this._bottomRight.y = this.bottom;
        return this._bottomRight;
    }

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
    public get left(): number {
        return this.x;
    }

    public set left(value: number) {
        this.x = value;
    }

    /**
     * The sum of the <code>x</code> and <code>width</code> properties.
     */
    public get right(): number {
        return this.x + this.width;
    }

    private _size: Point;
    /**
     * The size of the Rectangle object, expressed as a Point object with the
     * values of the <code>width</code> and <code>height</code> properties.
     */
    public get size(): Point {
        if (this._size == null)
            this._size = new Point();
        this._size.x = this.width;
        this._size.y = this.height;
        return this._size;
    }

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
    public get top(): number {
        return this.y;
    }

    public set top(value: number) {
        this.y = value;
    }

    private _topLeft: Point;
    /**
     * The location of the Rectangle object's top-left corner, determined by the
     * <i>x</i> and <i>y</i> coordinates of the point.
     */
    public get topLeft(): Point {
        if (this._topLeft == null)
            this._topLeft = new Point();
        this._topLeft.x = this.x;
        this._topLeft.y = this.y;
        return this._topLeft;
    }

    //endregion
    /**
     * Creates a copy of this @see:Rectangle.
     */
    clone(): Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    /**
     * Creates a @see:Rectangle from <b>ClientRect</b> or <b>SVGRect</b> objects.
     *
     * @param rc Rectangle obtained by a call to the DOM's <b>getBoundingClientRect</b>
     * or <b>GetBoundingBox</b> methods.
     */
    static fromBoundingRect(rc: any): Rectangle {
        if (rc.left != null) {
            return new Rectangle(rc.left, rc.top, rc.width, rc.height);
        } else if (rc.x != null) {
            return new Rectangle(rc.x, rc.y, rc.width, rc.height);
        } else {
            assert(false, 'Invalid source rectangle.');
        }
    }

    /**
     * Gets a rectangle that represents the union of two rectangles.
     *
     * @param rc1 First rectangle.
     * @param rc2 Second rectangle.
     */
    static union(rc1: Rectangle, rc2: Rectangle): Rectangle {
        const x      = Math.min(rc1.x, rc2.x),
              y      = Math.min(rc1.y, rc2.y),
              right  = Math.max(rc1.right, rc2.right),
              bottom = Math.max(rc1.bottom, rc2.bottom);
        return new Rectangle(x, y, right - x, bottom - y);
    }

    /**
     * Determines whether the rectangle contains a given point or rectangle.
     *
     * @param pt The @see:Point or @see:Rectangle to ckeck.
     */
    contains(pt: any): boolean {
        if (pt instanceof Point) {
            return this.containsPoint(<Point>pt);
        } else if (pt instanceof Rectangle) {
            return this.containsRect(<Rectangle>pt);
        } else {
            assert(false, 'Point or Rect expected.');
        }
    }

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
    public containsPoint(point: Point): boolean {
        return (this.x <= point.x && this.x + this.width >= point.x && this.y <= point.y && this.y + this.height >= point.y);
    }

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
    public containsRect(rect: Rectangle): boolean {
        return (this.x <= rect.x && this.x + this.width >= rect.x + rect.width && this.y <= rect.y && this.y + this.height >= rect.y + rect.height)
    }

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
    public inflate(dx: number, dy: number): void {
        this.x -= dx;
        this.y -= dy;
        this.width += 2 * dx;
        this.height += 2 * dy;
    }

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
    public inflatePoint(point: Point): void {
        this.x -= point.x;
        this.y -= point.y;
        this.width += 2 * point.x;
        this.height += 2 * point.y;
    }

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
    public intersection(toIntersect: Rectangle): Rectangle {
        let x1: number = Math.max(this.x, toIntersect.x);
        let x2: number = Math.min(this.x + this.width, toIntersect.x + toIntersect.width);
        let y1: number = Math.max(this.y, toIntersect.x);
        let y2: number = Math.min(this.y + this.height, toIntersect.x + toIntersect.height);
        if (x2 >= x1 && y2 >= y1) {
            return new Rectangle(x1, y1, x2 - x1, y2 - y1);
        }
        return new Rectangle;
    }

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
    public intersects(toIntersect: Rectangle): boolean {
        return (
            this.x + this.width > toIntersect.x
            && this.x < toIntersect.x + toIntersect.width
            && this.y + this.height > toIntersect.y
            && this.y < toIntersect.y + toIntersect.height
        );
    }

    /**
     * Determines whether or not this Rectangle object is empty.
     *
     * @return A value of <code>true</code> if the Rectangle object's width or
     *         height is less than or equal to 0; otherwise <code>false</code>.
     */
    public isEmpty(): boolean {
        return (this.x == 0 && this.y == 0 && this.width == 0 && this.height == 0);
    }

    /**
     * Adjusts the location of the Rectangle object, as determined by its
     * top-left corner, by the specified amounts.
     *
     * @param dx Moves the <i>x</i> value of the Rectangle object by this amount.
     * @param dy Moves the <i>y</i> value of the Rectangle object by this amount.
     */
    public offset(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    /**
     * Adjusts the location of the Rectangle object using a Point object as a
     * parameter. This method is similar to the <code>Rectangle.offset()</code>
     * method, except that it takes a Point object as a parameter.
     *
     * @param point A Point object to use to offset this Rectangle object.
     */
    public offsetPoint(point: Point): void {
        this.x += point.x;
        this.y += point.y;
    }

    /**
     * Sets all of the Rectangle object's properties to 0. A Rectangle object is
     * empty if its width or height is less than or equal to 0.
     *
     * <p> This method sets the values of the <code>x</code>, <code>y</code>,
     * <code>width</code>, and <code>height</code> properties to 0.</p>
     *
     */
    public setEmpty(): void {
        this.x      = 0;
        this.y      = 0;
        this.width  = 0;
        this.height = 0;
    }
}

import {Size} from "../ui/size";
import {Point} from "../ui/point";
export class Vector {
    _x;
    _y;

    public get x(): number {
        return this._x;
    }

    public set x(value) {
        this._x = value;
    }

    public get y(): number {
        return this._y;
    }

    public set y(value) {
        this._y = value;
    }

    public get length(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    public get lengthSquared(): number {
        return this._x * this._x + this._y * this._y;
    }

    public constructor(x, y) {
        this._x = x;
        this._y = y;
    }


    public static equals(vector1: Vector, vector2: Vector): boolean {
        if (vector1.x == vector2.x)
            return vector1.y == vector2.y;
        return false;
    }

    public static negative(vector: Vector): Vector {
        return new Vector(-vector._x, -vector._y);
    }

    public static Add(vector1: Vector, vector2: Vector): Vector {
        return new Vector(vector1._x + vector2._x, vector1._y + vector2._y);
    }

    public static Subtract(vector1: Vector, vector2: Vector): Vector {
        return new Vector(vector1._x - vector2._x, vector1._y - vector2._y);
    }

    public static Multiply(vector: Vector, scalar: number) {
        return new Vector(vector._x * scalar, vector._y * scalar);
    }

    public static Divide(vector: Vector, scalar: number) {
        scalar = (1.0 / scalar);
        return new Vector(vector._x * scalar, vector._y * scalar);
    }

    // public static transform(vector: Vector, matrix: Matrix)
    // {
    //     return matrix.transform(vector);
    // }

    /**
     * 确定指定的 {@param o} 是不是 {@link Vector} 结构，如果是，则确定其是否与此向量具有相同的 {@link Vector.x} 和 {@link Vector.y} 值。
     * @param o 要比较的向量。
     * @return 如果 {@param o} 是 {@link Vector} 并具有与此向量相同的 {@link Vector.x} 和 {@link Vector.y} 值，则为 true；否则为 false。
     */
    public Equals(o: any) {
        if (o == null || !(o instanceof Vector))
            return false;
        return Vector.equals(this, <Vector> o);
    }

    // /**
    //  * 规范化此向量。
    //  */
    // public Normalize()
    //     {
    //         return this.Divide(this.Length);
    //     }

    /**
     * 计算两个向量的叉积。
     *
     * @param vector 与之要计算的向量。
     * @return {@this } 和 {@paramr vector} 的叉乘积。可使用下面的公式计算叉乘积：(Vector1.X * Vector2.Y) - (Vector1.Y * Vector2.X)</returns>
     */
    public crossProduct(vector: Vector) {
        return this._x * vector._y - this._y * vector._x;
    }

    /**
     * 检索两个指定向量之间的角度（用度表示）。
     * @param vector 与之要计算的向量。
     * @return {@this } 和 {@param vector} 之间的角度（以度为单位）。
     */
    public angleBetween(vector: Vector) {
        return Math.atan2(this._x * vector._y - vector._x * this._y, this._x * vector._x + this._y * vector._y) * (180.0 / Math.PI);
    }

    /**
     * 对此向量求反。向量的大小与以前相同，但现在的方向与以前相反。
     */
    public negate() {
        return new Vector(-this.x, -this.y);
    }

    /**
     * 将两个向量相加并将结果以 {@Link Vector} 结构的形式返回。
     * @param vector 要相加的向量。
     * @return {@this } 与 {@param vector} 之和。
     */
    public Add(vector: Vector) {
        return new Vector(this._x + vector._x, this._y + vector._y);
    }

    /**
     * 将两个向量相减并将结果以 {@Link Vector} 结构的形式返回。
     * @param vector 要相减的向量。
     * @return {@this } 与 {@param vector} 之和。
     */
    public Subtract(vector: Vector) {
        return new Vector(this._x - vector._x, this._y - vector._y);
    }

    /**
     * 按指定向量平移指定点，并返回结果点。
     * @param point 要平移的点。
     * @return 按 {@this } 平移 {@param point} 的结果。
     */
    public addPoint(point: Point) {
        return new Point(point.x + this._x, point.y + this._y);
    }

    /**
     * 将当前向量与指定标量相乘
     *
     * @return 与 scalar 相乘的结果。
     * @param scalar
     */
    public Multiply(scalar: number) {
        return new Vector(this._x * scalar, this._y * scalar);
    }

    /**
     * 将当前向量除以指定标量
     *
     * @return 除以 scalar 的结果。
     * @param scalar
     */
    public divide(scalar: number): Vector {
        return this.Multiply(1.0 / scalar);
    }

    /**
     * 计算两个指定向量的点积
     *
     * @param vector 要相乘的向量。
     * @return 两个的标量点积，标量点积可通过下面的公式计算得出： (vector1.X * vector2.X) + (vector1.Y * vector2.Y)
     */
    public multiplyVector(vector: Vector) {
        return this._x * vector._x + this._y * vector._y;
    }

    /**
     * 计算两个向量的行列式。
     *
     * @param vector 要计算的向量。
     * @return
     */
    public determinant(vector: Vector) {
        return this._x * vector._y - this._y * vector._x;
    }

    public toSize() {
        return new Size(Math.abs(this._x), Math.abs(this._y));
    }

    public toPoint() {
        return new Point(this._x, this._y);
    }
}

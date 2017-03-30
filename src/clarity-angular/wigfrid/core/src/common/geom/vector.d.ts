import { Size } from "../ui/size";
import { Point } from "../ui/point";
export declare class Vector {
    _x: any;
    _y: any;
    x: number;
    y: number;
    readonly length: number;
    readonly lengthSquared: number;
    constructor(x: any, y: any);
    static equals(vector1: Vector, vector2: Vector): boolean;
    static negative(vector: Vector): Vector;
    static Add(vector1: Vector, vector2: Vector): Vector;
    static Subtract(vector1: Vector, vector2: Vector): Vector;
    static Multiply(vector: Vector, scalar: number): Vector;
    static Divide(vector: Vector, scalar: number): Vector;
    /**
     * 确定指定的 {@param o} 是不是 {@link Vector} 结构，如果是，则确定其是否与此向量具有相同的 {@link Vector.x} 和 {@link Vector.y} 值。
     * @param o 要比较的向量。
     * @return 如果 {@param o} 是 {@link Vector} 并具有与此向量相同的 {@link Vector.x} 和 {@link Vector.y} 值，则为 true；否则为 false。
     */
    Equals(o: any): boolean;
    /**
     * 计算两个向量的叉积。
     *
     * @param vector 与之要计算的向量。
     * @return {@this } 和 {@paramr vector} 的叉乘积。可使用下面的公式计算叉乘积：(Vector1.X * Vector2.Y) - (Vector1.Y * Vector2.X)</returns>
     */
    crossProduct(vector: Vector): number;
    /**
     * 检索两个指定向量之间的角度（用度表示）。
     * @param vector 与之要计算的向量。
     * @return {@this } 和 {@param vector} 之间的角度（以度为单位）。
     */
    angleBetween(vector: Vector): number;
    /**
     * 对此向量求反。向量的大小与以前相同，但现在的方向与以前相反。
     */
    negate(): Vector;
    /**
     * 将两个向量相加并将结果以 {@Link Vector} 结构的形式返回。
     * @param vector 要相加的向量。
     * @return {@this } 与 {@param vector} 之和。
     */
    Add(vector: Vector): Vector;
    /**
     * 将两个向量相减并将结果以 {@Link Vector} 结构的形式返回。
     * @param vector 要相减的向量。
     * @return {@this } 与 {@param vector} 之和。
     */
    Subtract(vector: Vector): Vector;
    /**
     * 按指定向量平移指定点，并返回结果点。
     * @param point 要平移的点。
     * @return 按 {@this } 平移 {@param point} 的结果。
     */
    addPoint(point: Point): Point;
    /**
     * 将当前向量与指定标量相乘
     *
     * @return 与 scalar 相乘的结果。
     * @param scalar
     */
    Multiply(scalar: number): Vector;
    /**
     * 将当前向量除以指定标量
     *
     * @return 除以 scalar 的结果。
     * @param scalar
     */
    divide(scalar: number): Vector;
    /**
     * 计算两个指定向量的点积
     *
     * @param vector 要相乘的向量。
     * @return 两个的标量点积，标量点积可通过下面的公式计算得出： (vector1.X * vector2.X) + (vector1.Y * vector2.Y)
     */
    multiplyVector(vector: Vector): number;
    /**
     * 计算两个向量的行列式。
     *
     * @param vector 要计算的向量。
     * @return
     */
    determinant(vector: Vector): number;
    toSize(): Size;
    toPoint(): Point;
}

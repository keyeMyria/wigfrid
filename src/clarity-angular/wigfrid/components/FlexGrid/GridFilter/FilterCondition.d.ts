/**
 * Defines a filter condition.
 *
 * This class is used by the @see:FlexGridFilter class; you will rarely have to use it directly.
 */
export declare class FilterCondition {
    private _op;
    private _val;
    private _strVal;
    /**
     * Gets or sets the operator used by this @see:FilterCondition.
     */
    operator: Operator;
    /**
     * Gets or sets the value used by this @see:FilterCondition.
     */
    value: any;
    /**
     * Gets a value that indicates whether the condition is active.
     */
    readonly isActive: boolean;
    /**
     * Clears the condition.
     */
    clear(): void;
    /**
     * Returns a value that determines whether the given value passes this
     * @see:FilterCondition.
     *
     * @param value The value to test.
     */
    apply(value: any): boolean;
}
/**
 * Specifies filter condition operators.
 */
export declare enum Operator {
    /** Equals. */
    EQ = 0,
    /** Does not equal. */
    NE = 1,
    /** Greater than. */
    GT = 2,
    /** Greater than or equal to. */
    GE = 3,
    /** Less than. */
    LT = 4,
    /** Less than or equal to. */
    LE = 5,
    /** Begins with. */
    BW = 6,
    /** Ends with. */
    EW = 7,
    /** Contains. */
    CT = 8,
    /** Does not contain. */
    NC = 9,
}

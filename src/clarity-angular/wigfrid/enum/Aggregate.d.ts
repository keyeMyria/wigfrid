/**
 * Specifies the type of aggregate to calculate over a group of values.
 */
export declare enum Aggregate {
    /**
     * No aggregate.
     */
    None = 0,
    /**
     * Returns the sum of the numeric values in the group.
     */
    Sum = 1,
    /**
     * Returns the count of non-null values in the group.
     */
    Cnt = 2,
    /**
     * Returns the average value of the numeric values in the group.
     */
    Avg = 3,
    /**
     * Returns the maximum value in the group.
     */
    Max = 4,
    /**
     * Returns the minimum value in the group.
     */
    Min = 5,
    /**
     * Returns the difference between the maximum and minimum numeric values in the group.
     */
    Rng = 6,
    /**
     * Returns the sample standard deviation of the numeric values in the group
     * (uses the formula based on n-1).
     */
    Std = 7,
    /**
     * Returns the sample variance of the numeric values in the group
     * (uses the formula based on n-1).
     */
    Var = 8,
    /**
     * Returns the population standard deviation of the values in the group
     * (uses the formula based on n).
     */
    StdPop = 9,
    /**
     * Returns the population variance of the values in the group
     * (uses the formula based on n).
     */
    VarPop = 10,
}

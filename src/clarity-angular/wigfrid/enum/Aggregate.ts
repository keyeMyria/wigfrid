

/**
 * Specifies the type of aggregate to calculate over a group of values.
 */
export enum Aggregate {
    /**
     * No aggregate.
     */
    None,
    /**
     * Returns the sum of the numeric values in the group.
     */
    Sum,
    /**
     * Returns the count of non-null values in the group.
     */
    Cnt,
    /**
     * Returns the average value of the numeric values in the group.
     */
    Avg,
    /**
     * Returns the maximum value in the group.
     */
    Max,
    /**
     * Returns the minimum value in the group.
     */
    Min,
    /**
     * Returns the difference between the maximum and minimum numeric values in the group.
     */
    Rng,
    /**
     * Returns the sample standard deviation of the numeric values in the group
     * (uses the formula based on n-1).
     */
    Std,
    /**
     * Returns the sample variance of the numeric values in the group
     * (uses the formula based on n-1).
     */
    Var,
    /**
     * Returns the population standard deviation of the values in the group
     * (uses the formula based on n).
     */
    StdPop,
    /**
     * Returns the population variance of the values in the group
     * (uses the formula based on n).
     */
    VarPop
}

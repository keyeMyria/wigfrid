/**
 * Represents a method that takes an item of any type and returns a
 * boolean that indicates whether the object meets a set of criteria.
 */
export interface IPredicate {
    (item: any): boolean;
}

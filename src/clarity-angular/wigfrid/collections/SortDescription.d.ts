import { Binding } from "../../core/index";
/**
 * Describes a sorting criterion.
 */
export declare class SortDescription {
    _bnd: Binding;
    _asc: boolean;
    /**
     * Initializes a new instance of a @see:SortDescription.
     *
     * @param property Name of the property to sort on.
     * @param ascending Whether to sort in ascending order.
     */
    constructor(property: string, ascending: boolean);
    /**
     * Gets the name of the property used to sort.
     */
    readonly property: string;
    /**
     * Gets a value that determines whether to sort the values in ascending order.
     */
    readonly ascending: boolean;
}

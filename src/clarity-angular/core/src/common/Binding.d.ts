/**
 * Provides binding to complex properties (e.g. 'customer.address.city')
 */
export declare class Binding {
    _path: string;
    _parts: any[];
    _key: string;
    /**
     * Initializes a new instance of a @see:Binding object.
     *
     * @param path Name of the property to bind to.
     */
    constructor(path: string);
    /**
     * Gets or sets the path for the binding.
     *
     * In the simplest case, the path is the name of the property of the source
     * object to use for the binding (e.g. 'street').
     *
     * Subproperties of a property can be specified by a syntax similar to that
     * used in JavaScript (e.g. 'address.street').
     */
    path: string;
    /**
     * Gets the binding value for a given object.
     *
     * If the object does not contain the property specified by the
     * binding @see:path, the method returns null.
     *
     * @param object The object that contains the data to be retrieved.
     */
    getValue(object: any): any;
    /**
     * Sets the binding value on a given object.
     *
     * If the object does not contain the property specified by the
     * binding @see:path, the value is not set.
     *
     * @param object The object that contains the data to be set.
     * @param value Data value to set.
     */
    setValue(object: any, value: any): void;
}

import { EventArgs } from "./EventArgs";
/**
 * Provides arguments for property change events.
 */
export declare class PropertyChangedEventArgs extends EventArgs {
    _name: string;
    _oldVal: any;
    _newVal: any;
    /**
     * Initializes a new instance of a @see:PropertyChangedEventArgs.
     *
     * @param propertyName The name of the property whose value changed.
     * @param oldValue The old value of the property.
     * @param newValue The new value of the property.
     */
    constructor(propertyName: string, oldValue: any, newValue: any);
    /**
     * Gets the name of the property whose value changed.
     */
    readonly propertyName: string;
    /**
     * Gets the old value of the property.
     */
    readonly oldValue: any;
    /**
     * Gets the new value of the property.
     */
    readonly newValue: any;
}

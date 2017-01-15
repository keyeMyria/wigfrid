import {EventArgs} from "./EventArgs";


/**
 * Provides arguments for property change events.
 */
export class PropertyChangedEventArgs extends EventArgs {
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
    constructor(propertyName: string, oldValue: any, newValue: any) {
        super();
        this._name = propertyName;
        this._oldVal = oldValue;
        this._newVal = newValue;
    }
    /**
     * Gets the name of the property whose value changed.
     */
    get propertyName(): string {
        return this._name;
    }
    /**
     * Gets the old value of the property.
     */
    get oldValue(): any {
        return this._oldVal;
    }
    /**
     * Gets the new value of the property.
     */
    get newValue(): any {
        return this._newVal;
    }
}

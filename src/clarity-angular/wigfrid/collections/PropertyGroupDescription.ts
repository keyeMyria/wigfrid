
import {GroupDescription} from "./GroupDescription";
import {Binding} from "../../core/index";
/**
 * Describes the grouping of items using a property name as the criterion.
 *
 * For example, the code below causes a @see:CollectionView to group items
 * by the value of their 'country' property:
 * <pre>
 * var cv = new wijmo.collections.CollectionView(items);
 * var gd = new wijmo.collections.PropertyGroupDescription('country');
 * cv.groupDescriptions.push(gd);
 * </pre>
 *
 * You may also specify a callback function that generates the group name.
 * For example, the code below causes a @see:CollectionView to group items
 * by the first letter of the value of their 'country' property:
 * <pre>
 * var cv = new wijmo.collections.CollectionView(items);
 * var gd = new wijmo.collections.PropertyGroupDescription('country',
 *   function(item, propName) {
     *     return item[propName][0]; // return country's initial
     * });
 * cv.groupDescriptions.push(gd);
 * </pre>
 */
export class PropertyGroupDescription extends GroupDescription {
    _bnd: Binding;
    _converter: Function;

    /**
     * Initializes a new instance of a @see:PropertyGroupDescription.
     *
     * @param property The name of the property that specifies
     * which group an item belongs to.
     * @param converter A callback function that takes an item and
     * a property name and returns the group name. If not specified,
     * the group name is the property value for the item.
     */
    constructor(property: string, converter?: Function) {
        super();
        this._bnd = new Binding(property);
        this._converter = converter;
    }
    /*
     * Gets the name of the property that is used to determine which
     * group an item belongs to.
     */
    get propertyName(): string {
        return this._bnd.path;
    }
    /**
     * Returns the group name for the given item.
     *
     * @param item The item to get group name for.
     * @param level The zero-based group level index.
     * @return The name of the group the item belongs to.
     */
    public groupNameFromItem(item: any, level: number): any {
        return this._converter
            ? this._converter(item, this.propertyName)
            : this._bnd.getValue(item);
    }
    /**
     * Returns a value that indicates whether the group name and the item name
     * match (which implies that the item belongs to the group).
     *
     * @param groupName The name of the group.
     * @param itemName The name of the item.
     * @return True if the names match; otherwise, false.
     */
    public namesMatch(groupName: any, itemName: any): boolean {
        return groupName === itemName;
    }
}

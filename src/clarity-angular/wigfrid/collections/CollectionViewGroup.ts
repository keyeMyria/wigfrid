import {GroupDescription} from "./GroupDescription";
import {CollectionView} from "./CollectionView";


/**
 * Represents a group created by a @see:CollectionView object based on
 * its @see:groupDescriptions property.
 */
export class CollectionViewGroup {
    _gd: GroupDescription;
    _name: string;
    _path: string;
    _level: number;
    _isBottomLevel: boolean;
    _groups: CollectionViewGroup[];
    _items: any[];

    /**
     * Initializes a new instance of a @see:CollectionViewGroup.
     *
     * @param groupDescription @see:GroupDescription that owns the new group.
     * @param name Name of the new group.
     * @param level Level of the new group.
     * @param isBottomLevel Whether this group has any subgroups.
     */
    constructor(groupDescription: GroupDescription, name: string, level: number, isBottomLevel: boolean) {
        this._gd = groupDescription;
        this._name = name;
        this._level = level;
        this._isBottomLevel = isBottomLevel;
        this._groups = [];
        this._items = [];
    }
    /*
     * Gets the name of this group.
     */
    get name(): string {
        return this._name;
    }
    /*
     * Gets the level of this group.
     */
    get level(): number {
        return this._level;
    }
    /*
     * Gets a value that indicates whether this group has any subgroups.
     */
    get isBottomLevel(): boolean {
        return this._isBottomLevel;
    }
    /*
     * Gets an array containing the items included in this group (including all subgroups).
     */
    get items(): any[] {
        return this._items;
    }
    /*
     * Gets an array containing the this group's subgroups.
     */
    get groups(): CollectionViewGroup[] {
        return this._groups;
    }
    /*
     * Gets the @see:GroupDescription that owns this group.
     */
    get groupDescription(): GroupDescription {
        return this._gd;
    }
    /**
     * Calculates an aggregate value for the items in this group.
     *
     * @param aggType Type of aggregate to calculate.
     * @param binding Property to aggregate on.
     * @param view CollectionView that owns this group.
     * @return The aggregate value.
     */
    getAggregate(aggType: Aggregate, binding: string, view?: ICollectionView) {
        const cv    = <CollectionView>tryCast(view, CollectionView),
              group = cv ? cv._getFullGroup(this) : this;
        return getAggregate(aggType, group.items, binding);
    }
}

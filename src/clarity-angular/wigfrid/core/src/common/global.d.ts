import { Rectangle } from "./ui/Rectangle";
import { Aggregate } from "../../../enum/Aggregate";
import { ICollectionView } from "../../../collections/interface/ICollectionView";
/**
 * Allows callers to verify whether an object implements an interface.
 */
export interface IQueryInterface {
    /**
     * Returns true if the object implements a given interface.
     *
     * @param interfaceName Name of the interface to look for.
     */
    implementsInterface(interfaceName: string): boolean;
}
/**
 * Casts a value to a type if possible.
 *
 * @param value Value to cast.
 * @param type Type or interface name to cast to.
 * @return The value passed in if the cast was successful, null otherwise.
 */
export declare function tryCast(value: any, type: any): any;
/**
 * Checks whether an @see:ICollectionView is defined and not empty.
 *
 * @param value @see:ICollectionView to check.
 */
export declare function hasItems(value: ICollectionView): number;
/**
 * Sets the start and end positions of a selection in a text field.
 *
 * This method is similar to the native @see:setSelectionRange method
 * in HTMLInputElement objects, except it checks for conditions that
 * may cause exceptions (element not in the DOM, disabled, or hidden).
 *
 * @param e
 * @param start Offset into the text field for the start of the selection.
 * @param end Offset into the text field for the end of the selection.
 */
export declare function setSelectionRange(e: HTMLInputElement, start: number, end?: number): void;
/**
 * Gets the bounding rectangle of an element in page coordinates.
 *
 * This is similar to the <b>getBoundingClientRect</b> function,
 * except that uses window coordinates, which change when the
 * document scrolls.
 */
export declare function getElementRect(e: Element): Rectangle;
/**
 * Calculates an aggregate value from the values in an array.
 *
 * @param aggType Type of aggregate to calculate.
 * @param items Array with the items to aggregate.
 * @param binding Name of the property to aggregate on (in case the items are not simple values).
 */
export declare function getAggregate(aggType: Aggregate, items: any[], binding?: string): any;

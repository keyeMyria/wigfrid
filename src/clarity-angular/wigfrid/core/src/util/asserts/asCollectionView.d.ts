import { ICollectionView } from "../../../../collections/interface/ICollectionView";
/**
 * Asserts that a value is an @see:ICollectionView or an Array.
 *
 * @param value Array or @see:ICollectionView.
 * @param nullOK Whether null values are acceptable.
 * @return The @see:ICollectionView that was passed in or a @see:CollectionView
 * created from the array that was passed in.
 */
export declare function asCollectionView(value: any, nullOK?: boolean): ICollectionView;

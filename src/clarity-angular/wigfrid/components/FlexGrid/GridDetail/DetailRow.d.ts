import { Row } from "../Grid/Row";
/**
 * Row that contains a single detail cell spanning all grid columns.
 */
export declare class DetailRow extends Row {
    _detail: HTMLElement;
    /**
     * Initializes a new instance of a @see:DetailRow.
     *
     * @param parentRow @see:Row that this @see:DetailRow provides details for.
     */
    constructor(parentRow: Row);
    /**
     * Gets or sets the HTML element that represents the detail cell in this @see:DetailRow.
     */
    detail: HTMLElement;
}

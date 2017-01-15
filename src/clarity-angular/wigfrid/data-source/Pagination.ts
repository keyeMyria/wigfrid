import * as _ from "lodash";

export class Pagination {
    private _pageCount;
    private _totalCount = -1;
    private _skip;
    private _take       = Number.POSITIVE_INFINITY;
    private _pageIndex  = 1; //通过skip及take来计算pageIndex
    private _enabled    = true;

    /**
     * pageCount
     */
    get pageCount() {
        return this.isLastPage ? this._totalCount % this._take : this.pageSize;
    }

    get isLastPage() {
        return !this.enabled || this._totalCount === 0 || this.pageIndex === Math.ceil(this._totalCount / this.pageSize);
    }

    totalCount(value: number) {
        this._totalCount = value;
        return this;
    }

    /**
     * pageSize
     */

    public get pageSize() {
        return this._take;
    }

    // public set pageSize(value) {
    //     this._take = value;
    // }

    /**
     * pageIndex
     */
    public get pageIndex(): number {
        return this._pageIndex;
    }

    public forPage(pageIndex, pageSize) {
        this._take = pageSize;
        this.moveToPage(pageIndex);
    }

    skip(value?: number) {
        if (_.isUndefined(value)) {
            return this._skip;
        }
        this._skip = value;
        return this;
    }

    limit(value?: number) {
        if (_.isUndefined(value)) {
            return this._take;
        }
        this._take = value;
        return this;
    }

    take(value?: number) {
        if (_.isUndefined(value)) {
            return this._take;
        }
        this._take = value;
        return this;
    }

    get isEnabled() {
        return this._enabled;
    }

    enabled(value: boolean) {
        this._enabled = value;
        return this;
    }

    moveToPage(pageIndex) {
        this._pageIndex = pageIndex;
        if (Number.isFinite(this._take)) {
            this._skip = (pageIndex - 1) * this._take;
        }
        return this;
    }

    moveToFirstPage() {
        this.moveToPage(1);
        return this;
    }

    moveToLastPage() {
        this.moveToPage(this._pageCount);
        return this;
    }

}

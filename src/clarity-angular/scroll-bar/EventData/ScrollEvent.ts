export class ScrollEvent {
    private _scrollEventType: ScrollEventType;
    private _newValue: number;

    /**
     * 获取一个 ScrollEventType 枚举值，该值描述导致此事件的在 Thumb 位置中的更改。
     * @return 一个 ScrollEventType 枚举值，该值描述导致 ScrollBar.Scroll 事件的 Thumb 移动的类型。
     */
    public get ScrollEventType(): ScrollEventType {
        return this._scrollEventType;
    }

    /**
     * 获取一个值，该值表示 ScrollBar 中的 Thumb的新位置。
     * @return 对应于 ScrollBar 中的 Thumb 的新位置的值。
     */
    public get NewValue(): number {
        return this._newValue;
    }

    /**
     * 通过使用指定的 ScrollEventType 枚举值和 ScrollBar 中的 Thumb 控件的新位置，初始化 ScrollEventArgs 类的实例。
     * @param scrollEventType 一个 ScrollEventType 枚举值，该值描述导致事件的 Thumb 移动的类型。
     * @param newValue 对应于 ScrollBar 中的 Thumb 的新位置的值。
     */
    public constructor(scrollEventType: ScrollEventType, newValue: number) {
        this._scrollEventType = scrollEventType;
        this._newValue = newValue;
    }
}

export enum ScrollEventType {
    EndScroll,
    First,
    LargeDecrement,
    LargeIncrement,
    Last,
    SmallDecrement,
    SmallIncrement,
    ThumbPosition,
    ThumbTrack,
}

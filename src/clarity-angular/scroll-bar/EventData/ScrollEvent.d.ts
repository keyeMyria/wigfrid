export declare class ScrollEvent {
    private _scrollEventType;
    private _newValue;
    /**
     * 获取一个 ScrollEventType 枚举值，该值描述导致此事件的在 Thumb 位置中的更改。
     * @return 一个 ScrollEventType 枚举值，该值描述导致 ScrollBar.Scroll 事件的 Thumb 移动的类型。
     */
    readonly ScrollEventType: ScrollEventType;
    /**
     * 获取一个值，该值表示 ScrollBar 中的 Thumb的新位置。
     * @return 对应于 ScrollBar 中的 Thumb 的新位置的值。
     */
    readonly NewValue: number;
    /**
     * 通过使用指定的 ScrollEventType 枚举值和 ScrollBar 中的 Thumb 控件的新位置，初始化 ScrollEventArgs 类的实例。
     * @param scrollEventType 一个 ScrollEventType 枚举值，该值描述导致事件的 Thumb 移动的类型。
     * @param newValue 对应于 ScrollBar 中的 Thumb 的新位置的值。
     */
    constructor(scrollEventType: ScrollEventType, newValue: number);
}
export declare enum ScrollEventType {
    EndScroll = 0,
    First = 1,
    LargeDecrement = 2,
    LargeIncrement = 3,
    Last = 4,
    SmallDecrement = 5,
    SmallIncrement = 6,
    ThumbPosition = 7,
    ThumbTrack = 8,
}

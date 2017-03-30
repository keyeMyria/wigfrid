import { OpaqueToken } from "@angular/core";
export declare const MAX_SCROLLBAR_SIZE = 30;
/**
 * 垂直方向少量滚动
 */
export declare const lineUpCommand: OpaqueToken;
/**
 * 垂直方向少量滚动
 */
export declare const lineDownCommand: OpaqueToken;
export declare const lineLeftCommand: OpaqueToken;
export declare const lineRightCommand: OpaqueToken;
export declare const pageUpCommand: OpaqueToken;
export declare const pageDownCommand: OpaqueToken;
export declare const pageLeftCommand: OpaqueToken;
export declare const pageRightCommand: OpaqueToken;
export declare const scrollToEndCommand: OpaqueToken;
export declare const scrollToHomeCommand: OpaqueToken;
export declare const scrollToRightEndCommand: OpaqueToken;
export declare const scrollToLeftEndCommand: OpaqueToken;
export declare const scrollToTopCommand: OpaqueToken;
export declare const scrollToBottomCommand: OpaqueToken;
export declare const scrollToHorizontalOffsetCommand: OpaqueToken;
export declare const scrollToVerticalOffsetCommand: OpaqueToken;
export declare const scrollHereCommand: OpaqueToken;
export declare const CommandBinding: (commandBindingsMeta: any) => (target: any) => void;


import {OpaqueToken} from "@angular/core";
export const MAX_SCROLLBAR_SIZE = 30;

/**
 * 垂直方向少量滚动
 */
export const lineUpCommand = new OpaqueToken("lineUpCommand");

/**
 * 垂直方向少量滚动
 */
export const lineDownCommand = new OpaqueToken("lineDownCommand");

export const lineLeftCommand = new OpaqueToken("lineLeftCommand");

export const lineRightCommand = new OpaqueToken("lineRightCommand");

export const pageUpCommand = new OpaqueToken("pageUpCommand");

export const pageDownCommand = new OpaqueToken("pageDownCommand");

export const pageLeftCommand = new OpaqueToken("pageLeftCommand");

export const pageRightCommand = new OpaqueToken("pageRightCommand");

export const scrollToEndCommand = new OpaqueToken("scrollToEndCommand");

export const scrollToHomeCommand = new OpaqueToken("scrollToHomeCommand");

export const scrollToRightEndCommand = new OpaqueToken("scrollToRightEndCommand");

export const scrollToLeftEndCommand = new OpaqueToken("scrollToLeftEndCommand");

export const scrollToTopCommand = new OpaqueToken("scrollToTopCommand");

export const scrollToBottomCommand = new OpaqueToken("scrollToBottomCommand");

export const scrollToHorizontalOffsetCommand = new OpaqueToken("scrollToHorizontalOffsetCommand");

export const scrollToVerticalOffsetCommand = new OpaqueToken("scrollToVerticalOffsetCommand");

export const scrollHereCommand = new OpaqueToken("scrollHereCommand");

export const CommandBinding = (commandBindingsMeta) => {
    return (target) => {
        //write in global map
        //global.map.set(target) = a binding info
    };
};

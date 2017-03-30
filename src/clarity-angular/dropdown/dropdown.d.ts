import { ElementRef, EventEmitter, Renderer } from "@angular/core";
export declare class Dropdown {
    private elementRef;
    private renderer;
    _open: boolean;
    _openChanged: EventEmitter<boolean>;
    isMenuClosable: boolean;
    private _menuPosition;
    menuPosition: string;
    removeExistingDirectionClass(): void;
    constructor(elementRef: ElementRef, renderer: Renderer);
    toggleDropdown(): void;
    open: boolean;
    onMouseClick(target: any): void;
}

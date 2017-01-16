import {EditHandlerDirective} from "./EditHandlerDirective";
import {KeyboardHandlerDirective} from "./KeyboardHandlerDirective";
import {AddNewHandlerDirective} from "./AddNewHandlerDirective";
import {MouseHandlerDirective} from "./MouseHandlerDirective";
import {SelectionHandlerDirective} from "./SelectionHandlerDirective";
import {DragHandlerDirective} from "./DragHandlerDirective";
import {Type} from "@angular/core";
import {ResizeHandlerDirective} from "./ResizeHandlerDirective";

export const FLEXGRID_HANDLE_DIRECTIVES: Type<any>[] = [
    AddNewHandlerDirective,
    EditHandlerDirective,
    KeyboardHandlerDirective,
    MouseHandlerDirective,
    SelectionHandlerDirective,
    DragHandlerDirective,
    ResizeHandlerDirective
];

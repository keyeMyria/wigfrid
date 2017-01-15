import {OpaqueToken, Type} from "@angular/core";

export interface FlexGridEditorFactory {
    (configs:FlexGridEditorConfigDefinition):any;
    new (configs:FlexGridEditorConfigDefinition):any;
}
export interface FlexGridEditorConfigDefinition {
    columnName?:string;
    editor?:Type<any>;
}

export class FlexGridEditorMetadata {
    constructor(public config:FlexGridEditorConfigDefinition[]) {
    }
}

export const FlexGridEditor = new OpaqueToken('FlexGridEditor');

export const FlexGridOptions = new OpaqueToken('FlexGridOptions');

import { OpaqueToken, Type } from "@angular/core";
export interface FlexGridEditorFactory {
    (configs: FlexGridEditorConfigDefinition): any;
    new (configs: FlexGridEditorConfigDefinition): any;
}
export interface FlexGridEditorConfigDefinition {
    columnName?: string;
    editor?: Type<any>;
}
export declare class FlexGridEditorMetadata {
    config: FlexGridEditorConfigDefinition[];
    constructor(config: FlexGridEditorConfigDefinition[]);
}
export declare const FlexGridEditor: OpaqueToken;
export declare const FlexGridOptions: OpaqueToken;

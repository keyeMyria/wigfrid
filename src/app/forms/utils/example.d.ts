import { AfterViewInit } from "@angular/core";
import { CodeHighlight } from "../../../clarity-angular/code/code-highlight";
export declare class Example implements AfterViewInit {
    codeHighlight: CodeHighlight;
    code: string;
    language: string;
    ngAfterViewInit(): void;
}

import { AfterViewInit } from "@angular/core";
import { CodeHighlight } from "clarity-angular";
export declare class Example implements AfterViewInit {
    codeHighlight: CodeHighlight;
    code: string;
    language: string;
    ngAfterViewInit(): void;
}

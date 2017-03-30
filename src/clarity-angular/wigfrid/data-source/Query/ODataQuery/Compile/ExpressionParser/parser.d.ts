import { InterpolationConfig } from '@angular/compiler/src/interpolation_config';
import { AST, ASTWithSource, BindingPipe, LiteralMap, ParseSpan, ParserError } from './ast';
import { Lexer, Token } from './lexer';
export declare class Parser {
    private _lexer;
    private errors;
    constructor(_lexer: Lexer);
    parseAction(input: string, location: any, interpolationConfig?: InterpolationConfig): ASTWithSource;
    parseBinding(input: string, location: any, interpolationConfig?: InterpolationConfig): ASTWithSource;
    parseSimpleBinding(input: string, location: string, interpolationConfig?: InterpolationConfig): ASTWithSource;
    private _reportError(message, input, errLocation, ctxLocation?);
    private _parseBindingAst(input, location, interpolationConfig);
    private _parseQuote(input, location);
    wrapLiteralPrimitive(input: string, location: any): ASTWithSource;
    private _stripComments(input);
}
export declare class _ParseAST {
    input: string;
    location: any;
    tokens: any[];
    parseAction: boolean;
    private errors;
    private rparensExpected;
    private rbracketsExpected;
    private rbracesExpected;
    index: number;
    constructor(input: string, location: any, tokens: any[], parseAction: boolean, errors: ParserError[]);
    peek(offset: number): Token;
    readonly next: Token;
    readonly inputIndex: number;
    span(start: number): ParseSpan;
    advance(): void;
    optionalCharacter(code: number): boolean;
    peekKeywordLet(): boolean;
    expectCharacter(code: number): void;
    optionalOperator(op: string): boolean;
    expectOperator(operator: string): void;
    expectIdentifierOrKeyword(): string;
    expectIdentifierOrKeywordOrString(): string;
    parseChain(): AST;
    parsePipe(): AST;
    parseExpression(): AST;
    parseConditional(): AST;
    parseLogicalOr(): AST;
    parseLogicalAnd(): AST;
    parseEquality(): AST;
    parseRelational(): AST;
    parseAdditive(): AST;
    parseMultiplicative(): AST;
    parsePrefix(): AST;
    parseCallChain(): AST;
    parsePrimary(): AST;
    parseExpressionList(terminator: number): AST[];
    parseLiteralMap(): LiteralMap;
    parseAccessMemberOrMethodCall(receiver: AST, isSafe?: boolean): AST;
    parseCallArguments(): BindingPipe[];
    /**
     * An identifier, a keyword, a string with an optional `-` inbetween.
     */
    expectTemplateBindingKey(): string;
    error(message: string, index?: number): void;
    private locationText(index?);
    private skip();
}

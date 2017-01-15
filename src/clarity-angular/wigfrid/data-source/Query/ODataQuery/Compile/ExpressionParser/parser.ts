/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable} from '@angular/core';

import * as chars from '../chars';
import {StringWrapper, escapeRegExp, isBlank, isPresent} from '@angular/core/src/facade/lang';
import {DEFAULT_INTERPOLATION_CONFIG, InterpolationConfig} from '@angular/compiler/src/interpolation_config';

import {AST, ASTWithSource, AstVisitor, Binary, BindingPipe, Chain, Conditional, EmptyExpr, FunctionCall, ImplicitReceiver, Interpolation, KeyedRead, KeyedWrite, LiteralArray, LiteralMap, LiteralPrimitive, MethodCall, ParseSpan, ParserError, PrefixNot, PropertyRead, PropertyWrite, Quote, SafeMethodCall, SafePropertyRead, TemplateBinding} from './ast';
import {EOF, Lexer, Token, TokenType, isIdentifier, isQuote} from './lexer';


@Injectable()
export class Parser {
  private errors: ParserError[] = [];

  constructor(private _lexer: Lexer) {}

  parseAction(
      input: string, location: any,
      interpolationConfig: InterpolationConfig = DEFAULT_INTERPOLATION_CONFIG): ASTWithSource {
    this._checkNoInterpolation(input, location, interpolationConfig);
    const tokens = this._lexer.tokenize(this._stripComments(input));
    const ast = new _ParseAST(input, location, tokens, true, this.errors).parseChain();
    return new ASTWithSource(ast, input, location, this.errors);
  }

  parseBinding(
      input: string, location: any,
      interpolationConfig: InterpolationConfig = DEFAULT_INTERPOLATION_CONFIG): ASTWithSource {
    const ast = this._parseBindingAst(input, location, interpolationConfig);
    return new ASTWithSource(ast, input, location, this.errors);
  }

  parseSimpleBinding(
      input: string, location: string,
      interpolationConfig: InterpolationConfig = DEFAULT_INTERPOLATION_CONFIG): ASTWithSource {
    const ast = this._parseBindingAst(input, location, interpolationConfig);
    // if (!SimpleExpressionChecker.check(ast)) {
    //   this._reportError(
    //       'Host binding expression can only contain field access and constants', input, location);
    // }
    return new ASTWithSource(ast, input, location, this.errors);
  }

  private _reportError(message: string, input: string, errLocation: string, ctxLocation?: any) {
    this.errors.push(new ParserError(message, input, errLocation, ctxLocation));
  }

  private _parseBindingAst(
      input: string, location: string, interpolationConfig: InterpolationConfig): AST {
    // Quotes expressions use 3rd-party expression language. We don't want to use
    // our lexer or parser for that, so we check for that ahead of time.
    const quote = this._parseQuote(input, location);

    if (isPresent(quote)) {
      return quote;
    }

    this._checkNoInterpolation(input, location, interpolationConfig);
    const tokens = this._lexer.tokenize(this._stripComments(input));
    return new _ParseAST(input, location, tokens, false, this.errors).parseChain();
  }

  private _parseQuote(input: string, location: any): AST {
    if (isBlank(input)) return null;
    const prefixSeparatorIndex = input.indexOf(':');
    if (prefixSeparatorIndex == -1) return null;
    const prefix = input.substring(0, prefixSeparatorIndex).trim();
    if (!isIdentifier(prefix)) return null;
    const uninterpretedExpression = input.substring(prefixSeparatorIndex + 1);
    return new Quote(new ParseSpan(0, input.length), prefix, uninterpretedExpression, location);
  }

  // parseTemplateBindings(input: string, location: any): TemplateBindingParseResult {
  //   var tokens = this._lexer.tokenize(input);
  //   return new _ParseAST(input, location, tokens, false, this.errors).parseTemplateBindings();
  // }

  wrapLiteralPrimitive(input: string, location: any): ASTWithSource {
    return new ASTWithSource(
        new LiteralPrimitive(new ParseSpan(0, isBlank(input) ? 0 : input.length), input), input,
        location, this.errors);
  }

  private _stripComments(input: string): string {
    const i = this._commentStart(input);
    return isPresent(i) ? input.substring(0, i).trim() : input;
  }


}

export class _ParseAST {
  private rparensExpected = 0;
  private rbracketsExpected = 0;
  private rbracesExpected = 0;

  index: number = 0;

  constructor(
      public input: string, public location: any, public tokens: any[], public parseAction: boolean,
      private errors: ParserError[]) {}

  peek(offset: number): Token {
    const i = this.index + offset;
    return i < this.tokens.length ? this.tokens[i] : EOF;
  }

  get next(): Token { return this.peek(0); }

  get inputIndex(): number {
    return (this.index < this.tokens.length) ? this.next.index : this.input.length;
  }

  span(start: number) { return new ParseSpan(start, this.inputIndex); }

  advance() { this.index++; }

  optionalCharacter(code: number): boolean {
    if (this.next.isCharacter(code)) {
      this.advance();
      return true;
    } else {
      return false;
    }
  }

  peekKeywordLet(): boolean { return this.next.isKeywordLet(); }

  expectCharacter(code: number) {
    if (this.optionalCharacter(code)) return;
    this.error(`Missing expected ${StringWrapper.fromCharCode(code)}`);
  }

  optionalOperator(op: string): boolean {
    if (this.next.isOperator(op)) {
      this.advance();
      return true;
    } else {
      return false;
    }
  }

  expectOperator(operator: string) {
    if (this.optionalOperator(operator)) return;
    this.error(`Missing expected operator ${operator}`);
  }

  expectIdentifierOrKeyword(): string {
    const n = this.next;
    if (!n.isIdentifier() && !n.isKeyword()) {
      this.error(`Unexpected token ${n}, expected identifier or keyword`);
      return '';
    }
    this.advance();
    return n.toString();
  }

  expectIdentifierOrKeywordOrString(): string {
    const n = this.next;
    if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
      this.error(`Unexpected token ${n}, expected identifier, keyword, or string`);
      return '';
    }
    this.advance();
    return n.toString();
  }

  parseChain(): AST {
    const exprs: AST[] = [];
    const start        = this.inputIndex;
    while (this.index < this.tokens.length) {
      const expr = this.parsePipe();
      exprs.push(expr);

      if (this.optionalCharacter(chars.$SEMICOLON)) {
        if (!this.parseAction) {
          this.error('Binding expression cannot contain chained expression');
        }
        while (this.optionalCharacter(chars.$SEMICOLON)) {
        }  // read all semicolons
      } else if (this.index < this.tokens.length) {
        this.error(`Unexpected token '${this.next}'`);
      }
    }
    if (exprs.length == 0) return new EmptyExpr(this.span(start));
    if (exprs.length == 1) return exprs[0];
    return new Chain(this.span(start), exprs);
  }

  parsePipe(): AST {
    let result = this.parseExpression();
    if (this.optionalOperator('|')) {
      if (this.parseAction) {
        this.error('Cannot have a pipe in an action expression');
      }

      do {
        const name        = this.expectIdentifierOrKeyword();
        const args: AST[] = [];
        while (this.optionalCharacter(chars.$COLON)) {
          args.push(this.parseExpression());
        }
        result = new BindingPipe(this.span(result.span.start), result, name, args);
      } while (this.optionalOperator('|'));
    }

    return result;
  }

  parseExpression(): AST { return this.parseConditional(); }

  parseConditional(): AST {
    const start = this.inputIndex;
    const result = this.parseLogicalOr();

    if (this.optionalOperator('?')) {
      const yes = this.parsePipe();
      let no: AST;
      if (!this.optionalCharacter(chars.$COLON)) {
        const end        = this.inputIndex;
        const expression = this.input.substring(start, end);
        this.error(`Conditional expression ${expression} requires all 3 expressions`);
        no = new EmptyExpr(this.span(start));
      } else {
        no = this.parsePipe();
      }
      return new Conditional(this.span(start), result, yes, no);
    } else {
      return result;
    }
  }

  parseLogicalOr(): AST {
    // '||'
    let result = this.parseLogicalAnd();
    while (this.optionalOperator('||')) {
      const right = this.parseLogicalAnd();
      result = new Binary(this.span(result.span.start), '||', result, right);
    }
    return result;
  }

  parseLogicalAnd(): AST {
    // '&&'
    let result = this.parseEquality();
    while (this.optionalOperator('&&')) {
      const right = this.parseEquality();
      result = new Binary(this.span(result.span.start), '&&', result, right);
    }
    return result;
  }

  parseEquality(): AST {
    // '==','!=','===','!=='
    let result = this.parseRelational();
    while (this.next.type == TokenType.Operator) {
      let operator = this.next.strValue;
      switch (operator) {
        case '==':
        case '===':
        case '!=':
        case '!==':
          this.advance();
          const right = this.parseRelational();
          result = new Binary(this.span(result.span.start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }

  parseRelational(): AST {
    // '<', '>', '<=', '>='
    let result = this.parseAdditive();
    while (this.next.type == TokenType.Operator) {
      let operator = this.next.strValue;
      switch (operator) {
        case '<':
        case '>':
        case '<=':
        case '>=':
          this.advance();
          const right = this.parseAdditive();
          result = new Binary(this.span(result.span.start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }

  parseAdditive(): AST {
    // '+', '-'
    let result = this.parseMultiplicative();
    while (this.next.type == TokenType.Operator) {
      const operator = this.next.strValue;
      switch (operator) {
        case '+':
        case '-':
          this.advance();
          let right = this.parseMultiplicative();
          result = new Binary(this.span(result.span.start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }

  parseMultiplicative(): AST {
    // '*', '%', '/'
    let result = this.parsePrefix();
    while (this.next.type == TokenType.Operator) {
      const operator = this.next.strValue;
      switch (operator) {
        case '*':
        case '%':
        case '/':
          this.advance();
          let right = this.parsePrefix();
          result = new Binary(this.span(result.span.start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }

  parsePrefix(): AST {
    if (this.next.type == TokenType.Operator) {
      const start = this.inputIndex;
      const operator = this.next.strValue;
      let result: AST;
      switch (operator) {
        case '+':
          this.advance();
          return this.parsePrefix();
        case '-':
          this.advance();
          result = this.parsePrefix();
          return new Binary(
              this.span(start), operator, new LiteralPrimitive(new ParseSpan(start, start), 0),
              result);
        case '!':
          this.advance();
          result = this.parsePrefix();
          return new PrefixNot(this.span(start), result);
      }
    }
    return this.parseCallChain();
  }

  parseCallChain(): AST {
    let result = this.parsePrimary();
    while (true) {
      if (this.optionalCharacter(chars.$PERIOD)) {
        result = this.parseAccessMemberOrMethodCall(result, false);

      } else if (this.optionalOperator('?.')) {
        result = this.parseAccessMemberOrMethodCall(result, true);

      } else if (this.optionalCharacter(chars.$LBRACKET)) {
        this.rbracketsExpected++;
        const key = this.parsePipe();
        this.rbracketsExpected--;
        this.expectCharacter(chars.$RBRACKET);
        if (this.optionalOperator('=')) {
          const value = this.parseConditional();
          result = new KeyedWrite(this.span(result.span.start), result, key, value);
        } else {
          result = new KeyedRead(this.span(result.span.start), result, key);
        }

      } else if (this.optionalCharacter(chars.$LPAREN)) {
        this.rparensExpected++;
        const args = this.parseCallArguments();
        this.rparensExpected--;
        this.expectCharacter(chars.$RPAREN);
        result = new FunctionCall(this.span(result.span.start), result, args);

      } else {
        return result;
      }
    }
  }

  parsePrimary(): AST {
    const start = this.inputIndex;
    if (this.optionalCharacter(chars.$LPAREN)) {
      this.rparensExpected++;
      const result = this.parsePipe();
      this.rparensExpected--;
      this.expectCharacter(chars.$RPAREN);
      return result;

    } else if (this.next.isKeywordNull()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), null);

    } else if (this.next.isKeywordUndefined()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), void 0);

    } else if (this.next.isKeywordTrue()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), true);

    } else if (this.next.isKeywordFalse()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), false);

    } else if (this.next.isKeywordThis()) {
      this.advance();
      return new ImplicitReceiver(this.span(start));

    } else if (this.optionalCharacter(chars.$LBRACKET)) {
      this.rbracketsExpected++;
      const elements = this.parseExpressionList(chars.$RBRACKET);
      this.rbracketsExpected--;
      this.expectCharacter(chars.$RBRACKET);
      return new LiteralArray(this.span(start), elements);

    } else if (this.next.isCharacter(chars.$LBRACE)) {
      return this.parseLiteralMap();

    } else if (this.next.isIdentifier()) {
      return this.parseAccessMemberOrMethodCall(new ImplicitReceiver(this.span(start)), false);

    } else if (this.next.isNumber()) {
      const value = this.next.toNumber();
      this.advance();
      return new LiteralPrimitive(this.span(start), value);

    } else if (this.next.isString()) {
      const literalValue = this.next.toString();
      this.advance();
      return new LiteralPrimitive(this.span(start), literalValue);

    } else if (this.index >= this.tokens.length) {
      this.error(`Unexpected end of expression: ${this.input}`);
      return new EmptyExpr(this.span(start));
    } else {
      this.error(`Unexpected token ${this.next}`);
      return new EmptyExpr(this.span(start));
    }
  }

  parseExpressionList(terminator: number): AST[] {
    let result: AST[] = [];
    if (!this.next.isCharacter(terminator)) {
      do {
        result.push(this.parsePipe());
      } while (this.optionalCharacter(chars.$COMMA));
    }
    return result;
  }

  parseLiteralMap(): LiteralMap {
    let keys: string[] = [];
    let values: AST[] = [];
    const start = this.inputIndex;
    this.expectCharacter(chars.$LBRACE);
    if (!this.optionalCharacter(chars.$RBRACE)) {
      this.rbracesExpected++;
      do {
        const key = this.expectIdentifierOrKeywordOrString();
        keys.push(key);
        this.expectCharacter(chars.$COLON);
        values.push(this.parsePipe());
      } while (this.optionalCharacter(chars.$COMMA));
      this.rbracesExpected--;
      this.expectCharacter(chars.$RBRACE);
    }
    return new LiteralMap(this.span(start), keys, values);
  }

  parseAccessMemberOrMethodCall(receiver: AST, isSafe: boolean = false): AST {
    const start = receiver.span.start;
    const id = this.expectIdentifierOrKeyword();

    if (this.optionalCharacter(chars.$LPAREN)) {
      this.rparensExpected++;
      const args = this.parseCallArguments();
      this.expectCharacter(chars.$RPAREN);
      this.rparensExpected--;
      let span = this.span(start);
      return isSafe ? new SafeMethodCall(span, receiver, id, args) :
                      new MethodCall(span, receiver, id, args);

    } else {
      if (isSafe) {
        if (this.optionalOperator('=')) {
          this.error('The \'?.\' operator cannot be used in the assignment');
          return new EmptyExpr(this.span(start));
        } else {
          return new SafePropertyRead(this.span(start), receiver, id);
        }
      } else {
        if (this.optionalOperator('=')) {
          if (!this.parseAction) {
            this.error('Bindings cannot contain assignments');
            return new EmptyExpr(this.span(start));
          }

          let value = this.parseConditional();
          return new PropertyWrite(this.span(start), receiver, id, value);
        } else {
          return new PropertyRead(this.span(start), receiver, id);
        }
      }
    }
  }

  parseCallArguments(): BindingPipe[] {
    if (this.next.isCharacter(chars.$RPAREN)) return [];
    const positionals: AST[] = [];
    do {
      positionals.push(this.parsePipe());
    } while (this.optionalCharacter(chars.$COMMA));
    return positionals as BindingPipe[];
  }

  /**
   * An identifier, a keyword, a string with an optional `-` inbetween.
   */
  expectTemplateBindingKey(): string {
    let result = '';
    let operatorFound = false;
    do {
      result += this.expectIdentifierOrKeywordOrString();
      operatorFound = this.optionalOperator('-');
      if (operatorFound) {
        result += '-';
      }
    } while (operatorFound);

    return result.toString();
  }

  error(message: string, index: number = null) {
    this.errors.push(new ParserError(message, this.input, this.locationText(index), this.location));
    this.skip();
  }

  private locationText(index: number = null) {
    if (isBlank(index)) index = this.index;
    return (index < this.tokens.length) ? `at column ${this.tokens[index].index + 1} in` :
                                          `at the end of the expression`;
  }

  // Error recovery should skip tokens until it encounters a recovery point. skip() treats
  // the end of input and a ';' as unconditionally a recovery point. It also treats ')',
  // '}' and ']' as conditional recovery points if one of calling productions is expecting
  // one of these symbols. This allows skip() to recover from errors such as '(a.) + 1' allowing
  // more of the AST to be retained (it doesn't skip any tokens as the ')' is retained because
  // of the '(' begins an '(' <expr> ')' production). The recovery points of grouping symbols
  // must be conditional as they must be skipped if none of the calling productions are not
  // expecting the closing token else we will never make progress in the case of an
  // extraneous group closing symbol (such as a stray ')'). This is not the case for ';' because
  // parseChain() is always the root production and it expects a ';'.

  // If a production expects one of these token it increments the corresponding nesting count,
  // and then decrements it just prior to checking if the token is in the input.
  private skip() {
    let n = this.next;
    while (this.index < this.tokens.length && !n.isCharacter(chars.$SEMICOLON) &&
           (this.rparensExpected <= 0 || !n.isCharacter(chars.$RPAREN)) &&
           (this.rbracesExpected <= 0 || !n.isCharacter(chars.$RBRACE)) &&
           (this.rbracketsExpected <= 0 || !n.isCharacter(chars.$RBRACKET))) {
      if (this.next.isError()) {
        this.errors.push(
            new ParserError(this.next.toString(), this.input, this.locationText(), this.location));
      }
      this.advance();
      n = this.next;
    }
  }
}

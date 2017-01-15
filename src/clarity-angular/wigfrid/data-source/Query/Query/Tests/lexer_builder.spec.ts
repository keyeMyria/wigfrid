import { Lexer, Token, TokenType } from "../Compile/ExpressionParser/lexer";
import * as chars from "../Compile/chars";
describe('lexer builder', () => {
    it('lexer parser', () => {
        let lexer = new Lexer();

        let tokens = lexer.tokenize('getter1?.getter2?.getter3.geeter4');

        expect(tokens).toEqual([
            new Token(0, TokenType.Identifier, 0, 'getter1'),
            new Token(7, TokenType.Operator, 0, '?.'),
            new Token(9, TokenType.Identifier, 0, 'getter2'),
            new Token(16, TokenType.Operator, 0, '?.'),
            new Token(18, TokenType.Identifier, 0, 'getter3'),
            new Token(25, TokenType.Character, chars.$PERIOD, '.'),
            new Token(26, TokenType.Identifier, 0, 'geeter4')
        ]);
    })
});

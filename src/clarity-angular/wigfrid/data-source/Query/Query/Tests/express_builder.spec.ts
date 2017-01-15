xdescribe('express builder', () => {

    it('create express', () => {
        let expr = new ExpressionBuilder();

        let express = expr.and(
            expr.eq('getter1', 'value1'),
            expr.gt('getter2', 'value2')
        );

        let visitResult = express.visit(new QueryExpressionVisitor());

        console.log(visitResult);

        expect(visitResult).toEqual(jasmine.any(And));

        expect(visitResult.separator).toEqual(" AND ");

        expect(visitResult.getParts().length).toEqual(2);

        let part1 = visitResult.getParts()[0];
        let part2 = visitResult.getParts()[1];

        expect(part1.getLeftExpr()).toEqual('getter1');
        expect(part2.getLeftExpr()).toEqual('getter2');

        expect(part1.getRightExpr()).toEqual(jasmine.any(LiteralPrimitive));
        expect(part1.getRightExpr().getValue()).toEqual('value1');
        expect(part2.getRightExpr()).toEqual(jasmine.any(LiteralPrimitive));
        expect(part2.getRightExpr().getValue()).toEqual('value2');

        console.log(visitResult.toString());
    });



});

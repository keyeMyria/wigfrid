import { CompileCriteria } from "../../../Query/ArrayQuery/Compile/CompileCriteria";

describe('compile criteria', () => {
    it('compile function `directly return function`', () => {
        let predicate = () => {
        };
        let criteria  = new CompileCriteria().compile(predicate);
        expect(criteria).toEqual(predicate);
    });

    it('compile one argument `means that whether the data is true`', () => {
        let criteria         = ['getter'];
        let compiledCriteria = new CompileCriteria().compile(criteria);
        let result           = compiledCriteria({getter: true});
        expect(result).toBeTruthy();
        let result2 = compiledCriteria({getter: 'some value'});
        expect(result2).toBeFalsy()
    });

    it('compile two argument `means that whether the data equal object defined`', () => {
        let criteria         = ['getter', 'value'];
        let compiledCriteria = new CompileCriteria().compile(criteria);
        let result           = compiledCriteria({getter: 'value'});
        expect(result).toEqual(true);
        let result2 = compiledCriteria({getter: 'some value'});
        expect(result2).toBeFalsy()
    });

    it('compile three argument `means that whether the data compare object defined`', () => {
        let criteria         = ['getter', 'eq', 'value'];
        let compiledCriteria = new CompileCriteria().compile(criteria);
        let result           = compiledCriteria({getter: 'value'});
        expect(result).toEqual(true);
        let result2 = compiledCriteria({getter: 'some value'});
        expect(result2).toBeFalsy()
    });

    it('compile three argument `gt`', () => {
        let criteria         = ['getter', 'gt', 2];
        let compiledCriteria = new CompileCriteria().compile(criteria);
        let result           = compiledCriteria({getter: 3});
        expect(result).toEqual(true);
        let result2 = compiledCriteria({getter: 1});
        expect(result2).toBeFalsy()
    });

    it('compile three argument `lt`', () => {
        let criteria         = ['getter', 'lt', 2];
        let compiledCriteria = new CompileCriteria().compile(criteria);
        let result           = compiledCriteria({getter: 1});
        expect(result).toEqual(true);
        let result2 = compiledCriteria({getter: 3});
        expect(result2).toBeFalsy()
    });

    it('compile criteria compare expr `<>`', () => {
        let criteria         = ['getter', '<>', 2];
        let compiledCriteria = new CompileCriteria().compile(criteria);
        let result           = compiledCriteria({getter: 'some value'});
        expect(result).toEqual(true);
        let result2 = compiledCriteria({getter: 2});
        expect(result2).toBeFalsy()
    });

    it('compile criteria compare expr `startswith`', () => {
        let criteria         = ['getter', 'startswith', 'start'];
        let compiledCriteria = new CompileCriteria().compile(criteria);
        let result           = compiledCriteria({getter: 'start value'});
        expect(result).toEqual(true);
        let result2 = compiledCriteria({getter: 'some string'});
        expect(result2).toBeFalsy()
    });

    it('compile criteria compare expr `endswith`', () => {
        let criteria         = ['getter', 'endswith', 'end'];
        let compiledCriteria = new CompileCriteria().compile(criteria);
        let result           = compiledCriteria({getter: 'value end'});
        expect(result).toEqual(true);
        let result2 = compiledCriteria({getter: 'some string'});
        expect(result2).toBeFalsy()
    });

    it('compile criteria compare expr `endswith`', () => {
        let criteria         = ['getter', 'notcontains', 'abc'];
        let compiledCriteria = new CompileCriteria().compile(criteria);
        let result           = compiledCriteria({getter: 'value end'});
        expect(result).toEqual(true);
        let result2 = compiledCriteria({getter: 'some abc'});
        expect(result2).toBeFalsy()
    });

    xit('compile group should throw exception', ()=> {
        let criteria = [['group0'], 'and', ['group1']];
        debugger;
        let compiledCriteria = new CompileCriteria().compile(criteria);
        expect(compiledCriteria).toThrow();
    })
});

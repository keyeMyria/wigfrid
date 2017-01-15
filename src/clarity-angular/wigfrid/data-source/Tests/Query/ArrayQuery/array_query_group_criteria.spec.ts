import { ArrayQuery } from "../../../Query/ArrayQuery/ArrayQuery";
import { CompileCriteria } from "../../../backup/CompileCriteria";
describe('array query group criteria', () => {
    xit('group array query', () => {
        let data       = [
            {name: 'Smith', sort: 1, then: 2},
            {name: 'Smith', sort: 2, then: 3},
            {name: 'Smith', sort: 1, then: 4},
            {name: 'Smith', sort: 2, then: 5},
            {name: 'Smith', sort: 1, then: 6},
            {name: 'Smith', sort: 2, then: 7},
        ];
        let arrayQuery = new ArrayQuery(data);
        let criteria   = 'sort';
        let result     = arrayQuery.groupBy(criteria);
        result.enumerate().subscribe(_ => {
            console.log(_);
        })
    });

    it('multi group array query', () => {
        let data       = [
            {name: 'Smith', sort: 1, then: 2},
            {name: 'Smith', sort: 2, then: 3},
            {name: 'Smith', sort: 1, then: 2},
            {name: 'Smith', sort: 2, then: 3},
            {name: 'Smith', sort: 1, then: 6},
            {name: 'Smith', sort: 2, then: 7},
        ];
        let arrayQuery = new ArrayQuery(data);

        let criteria   = 'sort';
        let criteria2  = 'then';
        let result     = arrayQuery.groupBy(criteria).groupBy(criteria2);
        result.enumerate().subscribe(_ => {
            console.log(_);
        })
    })
});

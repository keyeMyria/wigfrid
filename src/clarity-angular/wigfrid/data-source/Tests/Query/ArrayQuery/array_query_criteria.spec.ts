import { ArrayQuery } from "../../../Query/ArrayQuery/ArrayQuery";
import { CompileCriteria } from "../../../Query/ArrayQuery/Compile/CompileCriteria";

describe('array query by criteria', () => {

    it('array query filter', (done) => {
        let data = [
            {name: 'Smith', sort: 3},
            {name: 'Smith', sort: 4},
            {name: 'Smith', sort: 1},
            {name: 'Smith', sort: 2},
            {name: 'Smith', sort: 6},
            {name: 'Smith', sort: 5},
        ];

        let arrayQuery = new ArrayQuery(data);

        let criteria = new CompileCriteria().compile(['sort', 2]);
        let result   = arrayQuery.filter(criteria);
        result.enumerate().subscribe(_ => {
            expect(_).toEqual([{name: 'Smith', sort: 2}]);
            done();
        })
    });

    it('array query filter with criteria', (done) => {
        let data = [
            {name: 'Smith', sort: 3},
            {name: 'Smith', sort: 4},
            {name: 'Smith', sort: 1},
            {name: 'Smith', sort: 2},
            {name: 'Smith', sort: 6},
            {name: 'Smith', sort: 5},
        ];

        let arrayQuery = new ArrayQuery(data);
        let criteria   = new CompileCriteria().compile(['sort', 'eq', 2]);
        let result     = arrayQuery.filter(criteria);
        result.enumerate().subscribe(_ => {
            expect(_).toEqual([{name: 'Smith', sort: 2}]);
            done();
        })
    });

    it('array query sort by name with desc', (done) => {
        let data = [
            {name: 'Smith', sort: 3},
            {name: 'Smith', sort: 4},
            {name: 'Smith', sort: 1},
            {name: 'Smith', sort: 2},
            {name: 'Smith', sort: 6},
            {name: 'Smith', sort: 5},
        ];

        let arrayQuery = new ArrayQuery(data);
        let result     = arrayQuery.sortBy('sort', 'desc');
        result.enumerate().subscribe(_ => {
            expect(_).toEqual([
                {name: 'Smith', sort: 6},
                {name: 'Smith', sort: 5},
                {name: 'Smith', sort: 4},
                {name: 'Smith', sort: 3},
                {name: 'Smith', sort: 2},
                {name: 'Smith', sort: 1},
            ]);
            done();
        })
    });

    it('array query thenby', (done) => {
        let data = [
            {name: 'Smith', sort: 1, then: 2},
            {name: 'Smith', sort: 2, then: 3},
            {name: 'Smith', sort: 1, then: 4},
            {name: 'Smith', sort: 2, then: 5},
            {name: 'Smith', sort: 1, then: 6},
            {name: 'Smith', sort: 2, then: 7},
        ];

        let arrayQuery = new ArrayQuery(data);
        let result     = arrayQuery.sortBy('sort', 'desc').thenBy('then', 'desc');
        result.enumerate().subscribe(_ => {
            expect(_).toEqual([
                {name: 'Smith', sort: 2, then: 7},
                {name: 'Smith', sort: 2, then: 5},
                {name: 'Smith', sort: 2, then: 3},
                {name: 'Smith', sort: 1, then: 6},
                {name: 'Smith', sort: 1, then: 4},
                {name: 'Smith', sort: 1, then: 2},
            ]);
            done();
        })
    });

    it('array query slice `skip, take`', (done) => {
        let data       = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let arrayQuery = new ArrayQuery(data);
        let result     = arrayQuery.slice(2, 5);
        result.enumerate().subscribe(_ => {
            expect(_).toEqual([2, 3, 4, 5, 6]);
            done();
        })
    });

    it('array query groupBy', (done) => {
        let data       = [
            {name: 'Smith', sort: 1, then: 2},
            {name: 'Smith', sort: 2, then: 3},
            {name: 'Smith', sort: 1, then: 4},
            {name: 'Smith', sort: 2, then: 5},
            {name: 'Smith', sort: 1, then: 6},
            {name: 'Smith', sort: 2, then: 7},
        ];
        let arrayQuery = new ArrayQuery(data);
        let result     = arrayQuery.groupBy('sort');
        result.enumerate().subscribe(_ => {
            expect(_).toEqual([
                {
                    key:   1,
                    items: [
                        {name: 'Smith', sort: 1, then: 2},
                        {name: 'Smith', sort: 1, then: 4},
                        {name: 'Smith', sort: 1, then: 6},
                    ]
                },
                {
                    key:   2,
                    items: [
                        {name: 'Smith', sort: 2, then: 3},
                        {name: 'Smith', sort: 2, then: 5},
                        {name: 'Smith', sort: 2, then: 7},
                    ]
                }
            ]);
            done();
        })
    });

    it('array query select', (done) => {
        let data       = [
            {name: 'Smith', sort: 3},
            {name: 'Smith', sort: 4},
            {name: 'Smith', sort: 1},
            {name: 'Smith', sort: 2},
            {name: 'Smith', sort: 6},
            {name: 'Smith', sort: 5},
        ];
        let arrayQuery = new ArrayQuery(data);
        let result     = arrayQuery.select(_ => {
            return {selectSort: _.sort};
        });
        result.enumerate().subscribe(_ => {
            expect(_).toEqual([
                {selectSort: 3},
                {selectSort: 4},
                {selectSort: 1},
                {selectSort: 2},
                {selectSort: 6},
                {selectSort: 5},
            ]);
            done();
        })
    });


});

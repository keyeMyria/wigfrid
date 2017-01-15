import { ArrayQuery } from "../../../Query/ArrayQuery/ArrayQuery";

describe('array query aggregate', () => {
    it('array query aggregate avg', (done) => {
        let data       = [1, 2, 3, 4, 5];
        let arrayQuery = new ArrayQuery(data);

        let result = arrayQuery.avg();
        result.subscribe(_ => {
            expect(_).toEqual(3);
            done();
        })
    });

    it('array query aggregate count', (done) => {
        let data       = [1, 2, 3, 4, 5];
        let arrayQuery = new ArrayQuery(data);

        let result = arrayQuery.count();
        result.subscribe(_ => {
            expect(_).toEqual(5);
            done();
        })
    });

    it('array query aggregate sum', (done) => {
        let data       = [1, 2, 3, 4, 5];
        let arrayQuery = new ArrayQuery(data);

        let result = arrayQuery.sum();
        result.subscribe(_ => {
            expect(_).toEqual(15);
            done();
        })
    });
    it('array query aggregate min', (done) => {
        let data       = [1, 2, 3, 4, 5];
        let arrayQuery = new ArrayQuery(data);

        let result = arrayQuery.min();
        result.subscribe(_ => {
            expect(_).toEqual(1);
            done();
        })
    });
    it('array query aggregate max', (done) => {
        let data       = [1, 2, 3, 4, 5];
        let arrayQuery = new ArrayQuery(data);

        let result = arrayQuery.max();
        result.subscribe(_ => {
            expect(_).toEqual(5);
            done();
        })
    });
});

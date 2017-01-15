import { ArrayQuery } from "../../../Query/ArrayQuery/ArrayQuery";

describe('create array query', () => {

    it('create array query instance', () => {
        let data       = [1, 2, 3, 4];
        let arrayQuery = new ArrayQuery(data);

        arrayQuery.enumerate().subscribe(_=> {
            expect(_).toEqual(data);
        })
    });

});

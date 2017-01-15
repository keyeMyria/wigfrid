import { ArrayStore } from "../../../Store/ArrayStore/ArrayStore";
import { ReduceOperator } from "rxjs/operator/reduce";
import * as _ from "lodash";

describe('dev_data_source: create array store', () => {
    it('create array store instance', (done) => {
        let arrayStore = new ArrayStore([1, 2, 3, 4]);
        arrayStore.load().subscribe((_) => {
            expect(_).toEqual([1, 2, 3, 4]);
            done();
        })
    });

    it('filter data from array store', (done) => {
        let data       = [1, 2, 3, 4];
        let arrayStore = new ArrayStore(data);
        arrayStore.load({
            filter: (data) => {
                return data > 2;
            }
        }).subscribe((data) => {
            expect(data).toEqual([3, 4]);
            done();
        })
    });

    it('sort data from array store', (done) => {
        let data       = [1, 2, 3, 4];
        let arrayStore = new ArrayStore(data);
        arrayStore.load({
            sort: {getter: _=>_, desc: true}
        }).subscribe((data) => {
            expect(data).toEqual([4, 3, 2, 1]);
            done();
        })
    });

    it('select data from array store', (done) => {
        let data       = [1, 2, 3, 4];
        let arrayStore = new ArrayStore(data);
        arrayStore.load({
            select: _ => {
                return {value: _}
            }
        }).subscribe((data) => {
            expect(data).toEqual([
                {value: 1},
                {value: 2},
                {value: 3},
                {value: 4}
            ]);
            done();
        })
    });

    it('get data byKey from array store', (done) => {
        let data       = [1, 2, 3, 4, 5, 6];
        let arrayStore = new ArrayStore({
            data: data,
            key:  _ => data.indexOf(_)
        });
        arrayStore.byKey('2').subscribe(_ => {
            expect(_).toEqual(3);
            done();
        });
    });

});

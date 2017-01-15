import { ArrayStore } from "../../../Store/ArrayStore/ArrayStore";
import { Observable } from "rxjs";

describe('array store update', () => {
    it('update array store should return observable', () => {
        let data       = [1, 2, 3, 4, 5, 6];
        let arrayStore = new ArrayStore({
            data: data,
            key:  _ => data.indexOf(_)
        });

        let shouldObservable = arrayStore.update(2, 'x');
        expect(shouldObservable).toEqual(jasmine.any(Observable));
    });

    it('update array store', (done) => {
        let data       = [1, 2, 3, 4, 5, 6];
        let arrayStore = new ArrayStore({
            data: data,
            key:  _ => data.indexOf(_)
        });

        arrayStore.update(2, 'x').subscribe(_ => {
            expect(_).toEqual([2, 'x']);
            expect(data).toEqual([1, 2, 'x', 4, 5, 6]);
            done();
        })
    });

});

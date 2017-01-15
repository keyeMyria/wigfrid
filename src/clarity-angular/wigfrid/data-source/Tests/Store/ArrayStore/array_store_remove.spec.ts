import { ArrayStore } from "../../../Store/ArrayStore/ArrayStore";
import { Observable } from "rxjs";

describe('array store remove', () => {
    it('remove array store should return observable', () => {
        let data             = [1, 2, 3, 4];
        let arrayStore       = new ArrayStore({
            data: data,
            key:  _ => data.indexOf(_)
        });
        let shouldObservable = arrayStore.remove(2);
        expect(shouldObservable).toEqual(jasmine.any(Observable));
    });

    it('update array store', (done) => {
        let data       = [1, 2, 3, 4, 5, 6];
        let arrayStore = new ArrayStore({
            data: data,
            key:  _ => data.indexOf(_)
        });

        arrayStore.remove(2).subscribe(_ => {
            expect(_).toEqual(2);
            expect(data).toEqual([1, 2, 4, 5, 6]);
            done();
        })
    });

});

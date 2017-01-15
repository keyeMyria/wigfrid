import { ArrayStore } from "../../../Store/ArrayStore/ArrayStore";
import * as _ from "lodash";
import { Observable } from "rxjs";

describe('handle create insert update destory', () => {
    it('insert array store should return observable', () => {
        let data             = [1, 2, 3, 4];
        let arrayStore       = new ArrayStore(data);
        let shouldObservable = arrayStore.insert(5);
        expect(shouldObservable).toEqual(jasmine.any(Observable));
    });

    it('insert array store', () => {
        let data       = [1, 2, 3, 4, 5];
        let arrayStore = new ArrayStore(data);

        arrayStore.insert(6).subscribe();
        arrayStore.load().subscribe(_ => {
            expect(_).toEqual([1, 2, 3, 4, 5, 6]);
        })
    });

    it('capture insert event', (done) => {
        let data       = [1, 2, 3, 4, 5];
        let arrayStore = new ArrayStore(data);

        arrayStore.insert(6).subscribe();

        arrayStore.modifying.subscribe(_ => {
            expect(_).toBeNull();
        });

        arrayStore.inserting.subscribe(_ => {
            expect(_).toEqual([6]);
        });

        arrayStore.load().subscribe(_ => {
            expect(_).toEqual([1, 2, 3, 4, 5, 6]);
            done();
        })
    });

    it('capture inserted event', (done) => {
        let data       = [1, 2, 3, 4];
        let arrayStore = new ArrayStore(data);

        arrayStore.inserted.subscribe(_ => {
            expect(_).toEqual([6, 6]);
            done();
        });

        arrayStore.modified.subscribe(_ => {
            expect(_).toBeNull();
        });

        arrayStore.insert(6).subscribe(_ => {
            expect(_).toEqual([6, 6]);
        })
    })
});

import { DataSource } from "../../DataSource";
import { ArrayStore } from "../../Store/ArrayStore/ArrayStore";
import { Observable } from "rxjs";

describe('create data source', () => {
    it('create data source', () => {
        let arrayStore = new ArrayStore();
        let dataSource = new DataSource(arrayStore, {});

        arrayStore.insert(1).concat(
            arrayStore.insert(2),
            arrayStore.insert(3),
            arrayStore.insert(4)
        ).subscribe();
        dataSource.load().subscribe(_ => {
            expect(_).toEqual([1, 2, 3, 4]);
        });
    });

    it('data source event', () => {

    })

});

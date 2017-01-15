import { DataSource } from "../../DataSource";
import { ArrayStore } from "../../Store/ArrayStore/ArrayStore";
describe('data source options', ()=> {
    xit('data source dispose options', ()=> {
        let store      = new ArrayStore([1, 2, 3, 4, 5]);
        let dataSource = new DataSource(store, {
            dispose: ()=> {
                expect(this).toEqual(dataSource);
            }
        });

        dataSource.dispose();

    })
});

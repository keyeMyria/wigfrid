import { ArrayStore } from "../../Store/ArrayStore/ArrayStore";
import { DataSource } from "../../DataSource";
import { Pagination } from "../../Pagination";
describe('paginate data source', () => {
    xit('paginate data source with page size', ()=> {
        let data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                id:          i,
                name:        Math.round(Math.random() * 10000),
                description: Math.round(Math.random() * 10000),
            })
        }
        let store      = new ArrayStore(data);
        let dataSource = new DataSource(store, {
            pageSize: 20
        });
        dataSource.load().subscribe(_=> {
            expect(_.length).toEqual(20);
            expect(_[0].id).toEqual(0);
            expect(_[19].id).toEqual(19);
        });
    });

    it('paginate data source with page index', ()=> {
        let data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                id:          i,
                name:        Math.round(Math.random() * 10000),
                description: Math.round(Math.random() * 10000),
            })
        }
        let store      = new ArrayStore(data);
        let pagination = new Pagination();
        pagination.forPage(4, 20);
        let dataSource = new DataSource(store, {pagination: pagination});
        dataSource.load().subscribe(_=> {
            expect(_.length).toEqual(20);
            expect(_[0].id).toEqual(60);
            expect(_[19].id).toEqual(79);
        });
    });

    it('paginate data source with skip take', ()=> {
        let data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                id:          i,
                name:        Math.round(Math.random() * 10000),
                description: Math.round(Math.random() * 10000),
            })
        }
        let store      = new ArrayStore(data);
        let pagination = new Pagination();
        pagination.skip(60).take(20);
        let dataSource = new DataSource(store, {pagination: pagination});
        dataSource.load().subscribe(_=> {
            expect(_.length).toEqual(20);
            expect(_[0].id).toEqual(60);
            expect(_[19].id).toEqual(79);
        });
    });
});

import { DataSource } from "../../DataSource";
import { ArrayStore } from "../../Store/ArrayStore/ArrayStore";
import { Pagination } from "../../Pagination";
import { MockData } from "./MockData";
import { CompileCriteria } from "../../Query/ArrayQuery/Compile/CompileCriteria";

describe('data source method', ()=> {

    xit('cancel data source load', () => {
        let store      = new ArrayStore([1, 2, 3, 4]);
        let dataSource = new DataSource(store);

        let stream = dataSource.load().subscribe(_ => {
            throw new Error('could not be reached');
        });

        stream.unsubscribe();
    });

    xit('dispose data source method', () => {

    });

    it('filter data source method', () => {
        let store      = new ArrayStore([1, 2, 3, 4]);
        let dataSource = new DataSource(store);

        dataSource.filter(_=>_ > 2);

        let stream = dataSource.load().subscribe(_ => {
            expect(_).toEqual([3, 4]);
        });

    });

    it('fiter(with getter) data source method', ()=> {
        let data            = [1, 2, 3, 4];
        let store           = new ArrayStore(data);
        let dataSource      = new DataSource(store);
        let compileCriteria = new CompileCriteria().compile(['this', ">", 2]);
        dataSource.filter(compileCriteria);

        let stream = dataSource.load().subscribe(_ => {
            expect(_).toEqual([3, 4]);
        });
    });

    it('group data source method', (done)=> {
        let data            = [1, 2, 3, 4];
        let store           = new ArrayStore(data);
        let dataSource      = new DataSource(store);
        let compileCriteria = new CompileCriteria().compile(['this', ">", 2]);
        dataSource.group(compileCriteria);
        let stream = dataSource.load().subscribe(_ => {
            expect(_).toEqual([
                {key: jasmine.anything(), items: [1, 2]},
                {key: jasmine.anything(), items: [3, 4]}
            ]);
            done();
        });
    });

    it('items data source method', ()=> {
        let data            = [1, 2, 3, 4];
        let store           = new ArrayStore(data);
        let dataSource      = new DataSource(store);
        let compileCriteria = new CompileCriteria().compile(['this', ">", 2]);
        dataSource.filter(compileCriteria);
        let stream = dataSource.load().subscribe(_ => {
            expect(_).toEqual([3, 4]);
        });

        // expect(dataSource.items()).toEqual([3, 4]);
    });

    it('group data source with group function', (done)=> {
        let data            = new MockData().generate();
        let store           = new ArrayStore({data: data, key: 'country'});
        let dataSource      = new DataSource(store);
        let compileCriteria = new CompileCriteria().compile([['country']]);
        dataSource.group((_)=> {
            return _.country
        });
        let stream = dataSource.load().subscribe(_ => {
            _.map(grouped => {
                let result = grouped.items.filter(current => {
                    return current.country !== grouped.key;
                });

                expect(result.length).toEqual(0);
            });
            done();
        })
    });

    it('group data source with getter', (done)=> {
        let data            = new MockData().generate();
        let store           = new ArrayStore({data: data, key: 'country'});
        let dataSource      = new DataSource(store);
        let compileCriteria = new CompileCriteria().compile([['country']]);
        dataSource.group('country');
        let stream = dataSource.load().subscribe(_ => {
            _.map(grouped => {
                let result = grouped.items.filter(current => {
                    return current.country !== grouped.key;
                });
                expect(grouped.items.length).toBeGreaterThan(0);
                expect(result.length).toEqual(0);
            });
            expect(_.length).toBeGreaterThan(0);
            done();
        })
    });

});

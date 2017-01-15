import { DataSource } from "../DataSource";
import { ArrayStore } from "../Store/ArrayStore/ArrayStore";
/**
 * Created by LeBlanc on 16/8/17.
 */

xdescribe('create dev data source', () => {
    it('should create success', () => {
        let data = [1, 2, 3, 4];
        let dataSource = new DataSource(new ArrayStore(data), {});
    });

    it('should fetch data from data source', (done) => {
        let data = [1, 2, 3, 4];
        let dataSource = new DataSource(new ArrayStore(data), {});
        dataSource.load().subscribe((_)=> {
            expect(_).toEqual(data);
            done();
        });
    })

});

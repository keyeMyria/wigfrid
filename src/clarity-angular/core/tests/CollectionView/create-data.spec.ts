import { CollectionView } from "../../collections/CollectionView";
import * as faker from "faker";
import * as mockjs from "mockjs";
describe('create data', () => {
    let data = [];

    beforeEach(() => {
        const cities = '北京, 上海, 廣州, 武漢'.split(',');
        for (let i = 0; i < 100; i++) {
            data.push(
                {
                    id:     i,
                    city:   cities[i % cities.length],
                    date:   new Date(2014, i % 12, i % 28),
                    amount: Math.random() * 10000,
                    active: i % 4 === 0
                }
            );
        }
    });


    it('init data, and it can fetch data', () => {
        let ds = new CollectionView();

        ds.sourceCollection = data;

        expect(ds.items).toBe(data);
    });


});

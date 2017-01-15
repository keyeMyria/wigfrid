import { CollectionView } from "../../collections/CollectionView";
describe('_pagination data', () => {
    let data = [];

    beforeEach(() => {
        const cities = '北京,上海,廣州,武漢,杭州,天津'.split(',');
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

    it('should page and moveToFirstPage', () => {
        let cv      = new CollectionView(data);
        cv.pageSize = 10;

        expect(cv.items.length).toBe(10);

        expect(cv.pageIndex).toBe(0);
    });

    it('should page work and move to second page', () => {
        let cv      = new CollectionView(data);
        cv.pageSize = 10;

        let firstData = cv.items;
        cv.moveToNextPage();
        let secondData = cv.items;

        expect(firstData).not.toEqual(secondData);
        expect(cv.pageIndex).toBe(1);

    });

    it('should page work and move to last page', () => {
        let cv      = new CollectionView(data);
        cv.pageSize = 10;

        let firstData = cv.items;
        cv.moveToLastPage();
        let secondData = cv.items;

        expect(firstData).not.toEqual(secondData);
        expect(cv.pageIndex).toBe(data.length / 10 - 1);

    });

});

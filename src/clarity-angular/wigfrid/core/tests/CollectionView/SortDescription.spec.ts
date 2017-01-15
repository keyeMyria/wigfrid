import { SortDescription } from "../../collections/SortDescription";
import { CollectionView } from "../../collections/CollectionView";
import { count } from "rxjs/operator/count";
describe('sort description', () => {
    let data = [];

    beforeEach(() => {
        const cities = '北京, 上海, 廣州, 武漢, 杭州, 天津'.split(',');
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

    it('should filter all amount greater than 100', () => {
        // 创建一个新的CollectionView
        const cv = new CollectionView(data);
        // 通过数量降序排序项目
        const sd = new SortDescription('amount', false);
        cv.sortDescriptions.push(sd);
        // 只显示数量大于100的项目
        cv.filter         = function (item) {
            return item.amount > 100
        };
        // 在控制台里显示排序的过滤后的结果
        let filteredItems = [];
        for (let i = 0; i < cv.items.length; i++) {
            const item = cv.items[i];
            filteredItems.push(item);
            expect(item.amount).toBeGreaterThan(100);
            if (i > 0) {
                expect(item.amount).toBeLessThan(cv.items[i - 1].amount);
            }
            // console.log(i + ': ' + item.city + ' ' + item.amount);
        }
    });

    it('should not filter called, canFilter set false', () => {
        // 创建一个新的CollectionView
        const cv     = new CollectionView(data);
        cv.canFilter = false;
        // 通过数量降序排序项目
        const sd     = new SortDescription('amount', false);
        cv.sortDescriptions.push(sd);
        // 只显示数量大于100的项目
        let func = jasmine.createSpy('callback', (item) => {
            return item.amount > 100
        });
        cv.filter         =  func;

        expect(cv.items.length).toEqual(data.length);
        expect(func).not.toHaveBeenCalled();
    });

});

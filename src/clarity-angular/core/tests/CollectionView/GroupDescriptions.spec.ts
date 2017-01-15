import { CollectionView } from "../../collections/CollectionView";
import { GroupDescription } from "../../collections/GroupDescription";
import { PropertyGroupDescription } from "../../collections/PropertyGroupDescription";
import { CollectionViewGroup } from "../../collections/CollectionViewGroup";
describe('groupDescription', () => {
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

    it('should be grouped by city', () => {
        let cv = new CollectionView(data);

        const gd = new PropertyGroupDescription('city');
        cv.groupDescriptions.push(gd);

        expect(cv.groups).toContain(jasmine.any(CollectionViewGroup));

        cv.groups.forEach((cvg: CollectionViewGroup) => {
            expect(cvg).toEqual(jasmine.any(CollectionViewGroup));
        });
    });

    it('should not be groped when set canGroup to false', () => {
        let cv = new CollectionView(data);

        cv.canGroup = false;

        const gd = new PropertyGroupDescription('city');
        cv.groupDescriptions.push(gd);
        expect(cv.groups).toBe(null);

    })

});

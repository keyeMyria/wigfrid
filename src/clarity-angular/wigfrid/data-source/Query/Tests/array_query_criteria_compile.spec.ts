import { Criteria } from "../Criteria/Criteria";
import { Restrictions } from "../Criteria/Criterion/Restrictions";
import { ArrayQuery } from "../ArrayQuery/ArrayQuery";
describe('array query', () => {

    it('create criteria', () => {
        let criteria = new Criteria();
        let restrict = new Restrictions();

        criteria.where(restrict.and(
            restrict.eq('getter1', 'value1'),
            restrict.eq('getter2', 'value2'),
            restrict.eq('getter3', 'value3'),
        ));

        let arrayQuery = new ArrayQuery([
            {country: 'beijing', city: 'beijing'},
            {country: 'shanghai', city: 'shanghai'},
            {country: 'zhejiang', city: 'hz'}
        ]);

        let matchResult = arrayQuery.matching(criteria);


    });

    it('use getter func', () => {
        let criteria = new Criteria();
        let restrict = new Restrictions();

        criteria.where(restrict.and(
            restrict.eq((target)=> {
                return target.country
            }, 'beijing'),
            restrict.eq((target)=> {
                return target.city
            }, 'bj'),
        ));

        let arrayQuery = new ArrayQuery([
            {country: 'beijing', city: 'bj'},
            {country: 'shanghai', city: 'sh'},
            {country: 'zhejiang', city: 'hz'}
        ]);

        let matchResult = arrayQuery.matching(criteria);
        console.log(matchResult.toArray());

    });

    it('order and group', () => {
        let criteria = new Criteria();
        let restrict = new Restrictions();

        criteria
            .where(restrict.and(
                restrict.eq((target)=> {
                    return target.country
                }, 'beijing'),
                restrict.eq((target)=> {
                    return target.city
                }, 'bj'),
            ))
            .orderBy(['order_getter', false])
            .groupBy('group_getter');

        let arrayQuery = new ArrayQuery([
            {country: 'beijing', city: 'bj'},
            {country: 'shanghai', city: 'sh'},
            {country: 'zhejiang', city: 'hz'}
        ]);

        let matchResult = arrayQuery.matching(criteria);
        console.log(matchResult.toArray());

    });

});

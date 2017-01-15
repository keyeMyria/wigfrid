


describe('Sort', () => {
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


    it('sort', () => {

    })
});

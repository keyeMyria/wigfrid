export class MockData {
    data;

    generate() {
        const countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        const data      = [];
        for (let i = 0; i < 100000; i++) {
            data.push(
                {
                    id:      i,
                    country: countries[i % countries.length],
                    date:    new Date(2014, i % 12, i % 28),
                    amount:  Math.random() * 10000,
                    active:  i % 4 === 0
                }
            );
        }
        this.data = data;
        return data;
    }
}

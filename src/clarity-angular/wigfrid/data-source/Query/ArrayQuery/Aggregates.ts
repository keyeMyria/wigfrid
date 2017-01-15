
export let Aggregators = {
    count: {
        seed: 0,
        reducer: function (count) {
            return 1 + count
        }
    },
    sum: {
        seed: 0,
        reducer: function (sum, item) {
            return sum + item
        }
    },
    min: {
        reducer: function (min, item) {
            return item < min ? item : min
        }
    },
    max: {
        reducer: function (max, item) {
            return item > max ? item : max
        }
    },
    avg: {
        seed: [0, 0],
        reducer: function (pair, value) {
            return [pair[0] + value, pair[1] + 1]
        },
        finalize: function (pair) {
            return pair[1] ? pair[0] / pair[1] : NaN
        }
    }
};

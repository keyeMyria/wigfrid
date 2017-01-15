
xdescribe('expression builder based on angular', () => {

    let cb = new CriteriaBuilder();

    let criteria = cb.and(
        cb.eq('getter1', 'value1'),
        cb.gt('getter2', 'value2')
    );

});

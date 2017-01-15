
```
class JitArrayQueryAutoGen_0 {

    constructor(dependence1, dependence2, dependence3, ...) {
        this.dependence_0 = dependence1;
        this.dependence_1 = dependence2;
        this.dependence_2 = dependence3;
    }
    
    exec(target) {
        let $target = target;
    
        return this.comparison_0($target) && this.comparison_1($target)
    }
    
    comparison_0(target) {
        return target.getter1 == 'value1';
    }
    
    comparison_1(target) {
        return target.getter2 == target.getter3;
    }
}

new JitArrayQueryAutoGen_0(dependence1, dependence2, dependence3)
```

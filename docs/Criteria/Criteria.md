##Criteria 查询条件

###用于filter的格式
####标准的一个查询条件

`[getter, operator, value]` 这里称为一个`criteria`
 - getter 是用于生成访问对像值的函数
 - operator 与value进行比较的操作
 - value 用于比较的值
 
 若`operator`与`value`均不存在,则判断`getter`函数的取值是否存在
 
####组合查询条件
`[[getter, operator, value], and/or, [getter, operator, value]]`
 - `[getter, operator, value]` 这是一个标准`criteria`
 - `and/or` 组合只有`and`或`or`
 - `[getter, operator, value]` 这是一个标准`criteria`
 
简写为 `[criteria, and/or, criteria]` 这个组合查询条件可以称为 `group criteria`

####子查询条件
将组成查询条件进行嵌套, 就可以组成一个子查询
`[[[getter, operator, value], and/or, [getter, operator, value]], and/or, [getter, operator, value]]`
 - `[[getter, operator, value], and/or, [getter, operator, value]]` 这是一个`group criteria`
 - `and/or` 
 - `[getter, operator, value]` 这是一个`criteria`
 
 因此整个查询条件就是一个组合查询条件里包含一个组合查询条件和一个标准查询条件
 
####语法糖
由于几乎所有语言都是有优先级, 而且`and`的优先级要大于`or`, 所以这里也支持优先级操作.

------
 - `[[criteria 0, and, criteria 1], and, criteria 2]` 
    等同于
    `[criteria 0, and, criteria 1, and, criteria 2]`

------
 - `[[criteria 0, and, criteria 1], or, criteria 2]` 
    等同于
    `[criteria 0, and, criteria 1, or, criteria 2]`

------
 - `[[criteria 0, or, criteria 1], or, criteria 2]` 
    等同于
    `[criteria 0, or, criteria 1, or, criteria 2]`

------
 - `[[criteria 0, or, criteria 1], and, criteria 2]` 
    无简写方法

####字符串形式
可以不用数组形式, 而是直接用字符串来表示查询表达示. 虽然字符串不能很好的描述复杂的getter, 但是简单的查询直接用字符串还是非常便捷的

 - `'(getter > value) and (getter < value)'`
 - `'criteria_string and criteria_string and criteria_string'`
 - `'(criteria_string or criteria_string) and criteria_string'`
 
####对像形式
```
let express = new CriteriaExpress();
express
.and(criteria, criteria)
.or(criteria);


express
.and(new Expr().gt(value), new Expr().lt(value))
.or(new Expr().eq(value));
```

####声明变量

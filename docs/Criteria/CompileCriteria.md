##编译查询调件 

`[getter function, operator, value]`
 
 Criteria
  - criteria expression
  - bind value

在array query中getter可以直接用方法用于查询, 

array query
auto gen 代码应该类似如下:
```
(function(getter_0, getter_1, ... value_0, value_2) {
    return (object) => {
        getter_0(object) operator value_1
        and/or
        getter_1(object) operator value_2
    }
})(getter_0, getter_1, ... value_0, value_2)
```

remote query
auto gen 代码应该类似如下:
```
'http://(.+?)/getter operator value and/or getter operator value'
```

然后将编译好的criteria传入data source

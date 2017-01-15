#ArrayStore

###key定义:
 
 从`compileGetter`看出如何设置key
 
 - 数组
    分别编译getter
 - 字符串
    `.`号分割, 递归编译
 - 字符串`this`
    直接返回目标object


#ODataStore


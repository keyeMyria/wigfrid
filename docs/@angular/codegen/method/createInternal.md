:heavy_check_mark:可重写 
:heavy_check_mark:是否可编译实现(以Internal结尾都是编译生成, 反之没有编译生成)
  
编译实现的条件
----
  always
  
编译内容
----
Host节点编译(既是Host也是Component)

 - 根dom节点初始化
 - 根dom属性初始化
 - 树形dom元素初始化
   <pre>
         |         
         /\        
       /\ /\ /\     
    /\ /\ /\ /\ /\  
   </pre>
   
 - componetView当前组件的componentView(仍是继承于AppView)
 - compileViewExpr.create
 - init
 
Component节点编译
 - todo
 - todo
 - todo

Directive节点编译
 - todo
 - todo
 - todo
 
执行上下文
----
执行AppView的create会执行createInternal

执行影响
----
执行component的create
执行init


生命周期
----
初始化环境执行一次

返回值
----
AppElement

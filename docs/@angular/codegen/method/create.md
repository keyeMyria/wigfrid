:heavy_check_mark:可重写 
:heavy_check_mark:是否可编译实现(以Internal结尾都是编译生成, 反之没有编译生成)
  
**编译实现的条件**
  todo
  
**执行上下文** 
    
```
_View_AppComponent_Host0.createInternal (AppComponent_Ho…template.js:11)
DebugAppView.create (view.js:259)
ComponentFactory.create (component_factory.js:143)
(anonymous function) (application_ref.js:314)
(anonymous function) (application_ref.js:292)
onInvoke (ng_zone_impl.js:45)
ApplicationRef_.run (application_ref.js:290)
onInvoke (ng_zone_impl.js:45)
onInvokeTask (ng_zone_impl.js:36)
```

也就是创建componentRef时会执行这个方法

```
ComponentFactory.prototype.create = function (injector, projectableNodes, rootSelectorOrNode) {
   ...
    var hostView = this._viewFactory(vu, injector, null);
    var hostElement = hostView.create(EMPTY_CONTEXT, projectableNodes, rootSelectorOrNode);
   ...
};
```

DebugAppView 继承 AppView, 他直接调用了AppView里的create

```
create(context: T, givenProjectableNodes: Array<any | any[]>,
       rootSelectorOrNode: string | any): AppElement {
    this.context = context;
    var projectableNodes;
    switch (this.type) {
      case ViewType.COMPONENT:
        projectableNodes = ensureSlotCount(givenProjectableNodes, this.componentType.slotCount);
      break;
      case ViewType.EMBEDDED:
        projectableNodes = this.declarationAppElement.parentView.projectableNodes;
      break;
      case ViewType.HOST:
        // Note: Don't ensure the slot count for the projectableNodes as we store
        // them only for the contained component view (which will later check the slot count...)
        projectableNodes = givenProjectableNodes;
      break;
    }
    this._hasExternalHostElement = isPresent(rootSelectorOrNode);
    this.projectableNodes = projectableNodes;
    return this.createInternal(rootSelectorOrNode);
}
```

--------
    
**执行影响**


--------

**生命周期**
初始化环境执行一次

**返回值**

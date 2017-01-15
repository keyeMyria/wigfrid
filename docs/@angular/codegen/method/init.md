:heavy_check_mark:可重写 
:heavy_multiplication_x:是否可编译实现(以Internal结尾都是编译生成, 反之没有编译生成)

**编译实现的条件**
无

**执行上下文**
create里执行createInternal再执行父类init

**执行影响**
初始化 allNodes, disposables, subscriptions

```typescript
this.rootNodesOrAppElements = rootNodesOrAppElements;
    this.allNodes = allNodes;
    this.disposables = disposables;
    this.subscriptions = subscriptions;
    if (this.type === view_type_1.ViewType.COMPONENT) {
        // Note: the render nodes have been attached to their host element
        // in the ViewFactory already.
        this.declarationAppElement.parentView.viewChildren.push(this);
        this.dirtyParentQueriesInternal();
    }
```

**生命周期**
初始化时, 随create执行, 只执行一次

**返回值**
无
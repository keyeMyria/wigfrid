
```typescript

let criteria = new Criteria();
let r = new Restrictions();
criteria.add(
    r.or(
        r.and(
            r.eq('getter1', '=', 'value1');
            r.eq('getter2', '>=', 'value2');
        ),
        r.and(
            r.eq('getter1', '=', 'value1');
            r.eq('getter2', '>=', 'value2');
        )
    )
);

```


```ast

BinaryCompositeExpressionAst or

    BinaryCompositeExpressionAst and
    
        BinaryOperatorExpressionAst =                                          
                                                                                
            GetterAst 'getter1'            
            
            LiteralPrimitive 'value1'        
    
        BinaryOperatorExpressionAst =                                          
                                                                                
            GetterAst 'getter1'            
            
            LiteralPrimitive 'value1' 
    
    
    BinaryCompositeExpressionAst and
    
        BinaryOperatorExpressionAst =                                          
                                                                                
            GetterAst 'getter1'            
            
            LiteralPrimitive 'value1'        
    
        BinaryOperatorExpressionAst =                                          
                                                                                
            GetterAst 'getter1'            
            
            LiteralPrimitive 'value1' 
            
```

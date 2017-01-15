###Restrictions 条件限制


####用例


 - 
    ```
    r.eq('getter1', 'value1'),
    ```
    
 - 
    ```
    r.and(
        r.eq('getter1', 'value1'),
        r.eq('getter2', 'value2'),
    )
    ```
    
 -
    ```
    r.or(
        r.eq('getter1', 'value1'),
        r.eq('getter2', 'value2'),
    )
    ```

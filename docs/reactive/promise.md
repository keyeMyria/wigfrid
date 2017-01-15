```typescript
var source = Rx.Observable.of(1,2,3,4)
  .concatMap(function(x) {
    return Rx.Observable.defer(function() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(x);
        }, 1000);
      });
    });
  })
  .subscribe(function(i) {
    console.log(i);
  });
  ```

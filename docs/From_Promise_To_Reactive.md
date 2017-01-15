
###Queue

Promise
```
```

Reactive
```
import { Observable, Subject, Operator } from "rxjs";

var subject = new Subject();

var observable1 = Observable.create((observer) => {
    observer.next(1);
    setTimeout(() => {
        observer.complete()
    }, 1000)
});

var observable2 = Observable.create((observer) => {
    observer.next(2);
    setTimeout(() => {
        observer.complete()
    }, 1000)
});

var observable3 = Observable.create((observer) => {
    observer.next(3);
    setTimeout(() => {
        observer.complete()
    }, 1000)
});

let busy   = false;
let stream = subject
    .filter(_ =>!busy)
    .map(_ =>_.do(_ =>busy = true, _ =>busy = false, () =>busy = false))
    .concatAll();

stream.subscribe(_ => {
    console.log('result:', _);
});

subject.next(observable1);
setTimeout(() => {
    subject.next(observable2);
}, 1000);
subject.next(observable3);

```

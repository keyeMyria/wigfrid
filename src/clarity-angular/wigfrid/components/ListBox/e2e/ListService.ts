import {Injectable} from '@angular/core'
import * as _m from "mockjs"

const Mock: any = _m;

@Injectable()
export class ListService {

  private _items;

  constructor() {

    this._items = Mock.mock({
      'array|20-50': [
        {
          "name": Mock.Random.name(),
          "age|1-100": 20,
          "height|100-200": 100
        }
      ]
    })

  }

  getItems() {
    return Mock.mock({
      'array|3-10': [Mock.Random.name()]
    })
  }

}

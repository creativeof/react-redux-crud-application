import _ from 'lodash'
import {
  READ_EVENTS,
  DELETE_EVENT,
} from '../actions'

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      // console.log(action.response.data)
      // [
      //   {"id":1,"title":"Let's have an event 1!","body":"This is the body for event 1."},
      //   {"id":2,"title":"Let's have an event 2!","body":"This is the body for event 2."}
      // ]

      // console.log(_.mapKeys(action.response.data, 'id'))
      // {
      //   1: {"id":1,"title":"Let's have an event 1!","body":"This is the body for event 1."},
      //   2: {"id":2,"title":"Let's have an event 2!","body":"This is the body for event 2."}
      // }
      // こちらのデータ構造の方がアクセスビリティが良い

      return _.mapKeys(action.response.data, 'id')
    case DELETE_EVENT:
      // DELETE_EVENTがdispatchされた場合、idが渡ってくる
      console.log(action.id)
      // 該当idのイベントをメモリ上から消去する
      delete events[action.id]

      // ... スプレッド演算子 新しいメモリ空間上に配置
      return { ...events }
    default:
      return events
  }
}

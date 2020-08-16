import _ from 'lodash'
import { READ_EVENTS } from '../actions'

export default (event = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      console.log(action.response.data)
      // [
      //   {"id":1,"title":"Let's have an event 1!","body":"This is the body for event 1."},
      //   {"id":2,"title":"Let's have an event 2!","body":"This is the body for event 2."}
      // ]

      console.log(_.mapKeys(action.response.data, 'id'))
      // こちらのデータ構造の方がアクセスビリティが良い
      // {
      //   1: {"id":1,"title":"Let's have an event 1!","body":"This is the body for event 1."},
      //   2: {"id":2,"title":"Let's have an event 2!","body":"This is the body for event 2."}
      // }

      return _.mapKeys(action.response.data, 'id')
    default:
      return event
  }
}

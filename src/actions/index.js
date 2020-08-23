import axios from 'axios'

// exportしてReducerでもimportできるようにする
export const READ_EVENTS = 'READ_EVENTS'
export const READ_EVENT = 'READ_EVENT'
export const CREATE_EVENT = 'CREATE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1'
const QUERYSTRING = '?token=token123'


// redux-thunkで関数を変えることができるようになる
// async awaitを使って戻り値を非同期にする
// responseを含めたactionをdespatchでreducerに渡していく
export const readEvents = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`)
  console.log(response)
  dispatch({type: READ_EVENTS, response })
}

// asyncを使わない場合
// export const readEvents = () => dispatch => {
//   axios.get(`${ROOT_URL}/events${QUERYSTRING}`)
//     .then(response => {
//       dispatch({ type: READ_EVENTS, response })
//     })
// }

// asyncを使わない場合、responseを扱うには、then配下にコールバック関数を登録しなければならない。
// responseの値を元に、さらにaxios で外部のapiに対して通信を行うなどの処理をする場合には、
// さらにそこから先の処理がthenの中に書かなければならず、
// 処理がどんどんネストしていくいわゆるネスト地獄とかコールバック地獄と言った状況になってしまい、結果、コードの見通しが悪くなってしまう。
// 一方、async await を使った方の実装ではネスト地獄にはならず、非同期処理を同期処理的な見た目で実装できる


export const postEvent = values => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values)
  console.log(response)
  // reducerに対する状態の更新を促す
  dispatch({ type: CREATE_EVENT, response })
}

export const putEvent = values => async dispatch => {
  console.log(values)
  const response = await axios.put(`${ROOT_URL}/events/${values.id}${QUERYSTRING}`, values)
  dispatch({ type: UPDATE_EVENT, response })
}

export const getEvent = id => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
  console.log(response)
  dispatch({ type: READ_EVENT, response })
}

// deleteEventにはidが渡ってくる
export const deleteEvent = id => async dispatch => {
  await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
  // reducer側に削除されたidを渡す
  dispatch({ type: DELETE_EVENT, id })
}

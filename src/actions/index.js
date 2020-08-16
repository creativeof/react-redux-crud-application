import axios from 'axios'

// exportしてReducerでもimportできるようにする
export const READ_EVENTS = 'READ_EVENTS'
export const CREATE_EVENT = 'CREATE_EVENT'

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

export const postEvent = values => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values)
  console.log(response)
  dispatch({type: CREATE_EVENT, response })
}

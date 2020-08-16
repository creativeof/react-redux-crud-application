// export const increment = () => {
//   return {
//     type: 'INCREMENT'
//   }
// }

// exportしてReducerでもimportできるようにする
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

// exportしてviewを担当するComponentでimportできるようにする
export const increment = () => ({
  type: INCREMENT
})

export const decrement = () => ({
  type: DECREMENT
})

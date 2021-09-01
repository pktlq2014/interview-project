import { ACTION } from '../../../consts/index';
// nhận data từ server
var dataLocal = JSON.parse(localStorage.getItem('data'))
const initialState = dataLocal && dataLocal.length > 0 ? dataLocal : []
var getMeal = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.GET_MEAL: {
      state = [...action.data]
      localStorage.setItem('data', JSON.stringify(state))
      return [...state]
    }
    case ACTION.GET_MEAL_DELETE: {
      console.log(action)
      var array = [...state]
      array && array.length > 0 && array.forEach((values, index) => {
        if (values.idMeal === action.data.idMeal) {

          array.splice(index, 1)
        }
      })
      state = [...array]
      // localStorage.removeItem('data')
      localStorage.setItem('data', JSON.stringify(state))
      return [...state]
      // state = [...action.data]
      // return [...state]
    }
    case ACTION.GET_MEAL_UPDATE: {
      console.log(action)
      var array = [...state]
      array && array.length > 0 && array.forEach((values, index) => {
        if (values.idMeal === action.data.idMeal) {
          array[index].strMeal = action.data.strMeal
          array[index].count = action.data.count
        }
      })
      state = [...array]
      // localStorage.removeItem('data')
      localStorage.setItem('data', JSON.stringify(state))
      return [...state]
      // state = [...action.data]
      // return [...state]
    }
    default:
      return state
  }
}
export default getMeal

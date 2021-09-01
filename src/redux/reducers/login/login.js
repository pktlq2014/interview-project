import { ACTION } from './../../../consts/index';
// nhận data từ server
const initialState = {
  loading: false,
}
var login = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.LOADING: {
      state.loading = action.data
      return state
    }

    default:
      return state
  }
}
export default login

import { combineReducers } from 'redux'
import login from './login/login'
import getMeal from './getMeal/getMeal.js'
const rootReducers = combineReducers({
    login,
    getMeal
})
export default rootReducers
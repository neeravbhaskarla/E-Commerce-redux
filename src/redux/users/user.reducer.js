import {UserActions} from './users.types'
import {auth} from '../../firebase/firebase.utils'
const INITIAL_STATE = {
    currentUser: null
}

const userReducer =(state = INITIAL_STATE, action )=>{
    switch(action.type){
        case UserActions.SET_CURRENT_USER:
            return{
                currentUser: action.payload
            }
        case UserActions.LOG_OUT_USER:
            auth.signOut()
            return{
                currentUser: null
            }
        default:
            return state
    }
}
export default userReducer

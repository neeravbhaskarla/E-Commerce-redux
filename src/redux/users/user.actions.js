import {UserActions} from './users.types'

export const setUser = user =>({
    type: UserActions.SET_CURRENT_USER,
    payload: user
})
export const logOutUser = () =>({
    type: UserActions.LOG_OUT_USER
})
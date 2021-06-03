import {ordersTypes} from './orders.types'

const INITIAL_STATE = {
    orders: null,
    errorMessage: undefined
}

const ordersReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case ordersTypes.FETCH_ORDERS_START:
            return {
                ...state,
            };
        case ordersTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload
            };
        case ordersTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state
    }
}
export default ordersReducer
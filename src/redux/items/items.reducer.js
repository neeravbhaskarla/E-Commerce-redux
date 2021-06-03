import {ItemTypes} from './items.types'

const INITIAL_STATE = {
    items: null,
    errorMessage: undefined
}

const itemsReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case ItemTypes.FETCH_ITEMS_START:
            return {
                ...state,
            };
        case ItemTypes.FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload
            };
        case ItemTypes.FETCH_ITEMS_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state
    }
}
export default itemsReducer
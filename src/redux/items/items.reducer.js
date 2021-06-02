import {ItemTypes} from './items.types'

const INITIAL_STATE = {
    items: null
}

const itemsReducer = (state = INITIAL_STATE, actions) =>{
    switch(actions.type){
        case ItemTypes.SET_ITEMS:
            return{
                items: actions.payload
            }
        case ItemTypes.REMOVE_ITEMS:
            return{
                items: null
            }
        default:
            return state
    }
}
export default itemsReducer
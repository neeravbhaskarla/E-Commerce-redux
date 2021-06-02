import {ItemTypes} from './items.types'

export const setItems=(items)=>({
    type: ItemTypes.SET_ITEMS,
    payload: items
})
export const removeItems=()=>({
    type: ItemTypes.REMOVE_ITEMS
})
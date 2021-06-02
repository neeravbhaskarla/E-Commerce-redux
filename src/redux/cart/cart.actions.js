import {cartTypes} from './cart.types'

export const addToCart = items =>({
    type: cartTypes.ADD_CART,
    payload: items
})
export const removeFromCart = id =>({
    type: cartTypes.REMOVE_CART,
    payload: id
})
export const incItemQuantity = item =>({
    type: cartTypes.INC_ITEM,
    payload: item
})
export const decItemQuantity = item =>({
    type: cartTypes.DEC_ITEM,
    payload: item
})
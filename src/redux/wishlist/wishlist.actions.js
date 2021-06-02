import {wishListTypes} from './wishlist.types'

export const addToWishlist = (item)=>({
    type: wishListTypes.ADD_WISHLIST,
    payload: item
})
export const removeFromWishlist = id =>({
    type: wishListTypes.REMOVE_WISHLIST,
    payload: id
})
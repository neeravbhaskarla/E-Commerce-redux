import {wishListTypes} from './wishlist.types'

const INITIAL_STATE = {
    wishlist:[]
}

const wishlistReducer = (state=INITIAL_STATE, action) =>{
    let dupWishList;
    switch(action.type){
        case wishListTypes.ADD_WISHLIST:
            dupWishList = state.wishlist
            dupWishList=dupWishList.concat(action.payload)
            return{
                wishlist: dupWishList
            }
        case wishListTypes.REMOVE_WISHLIST:
            dupWishList = state.wishlist
            dupWishList = dupWishList.filter(item=>item.id!==action.payload)
            return{
                wishlist: dupWishList
            }
        default:
            return state
    }
}

export default wishlistReducer
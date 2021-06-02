import {combineReducers} from 'redux'

import userReducer from './users/user.reducer'
import itemsReducer from './items/items.reducer'
import cartReducer from './cart/cart.reducer'
import wishlistReducer from './wishlist/wishlist.reducer'


const rootReducer = combineReducers({
    user: userReducer,
    items: itemsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
})

export default rootReducer
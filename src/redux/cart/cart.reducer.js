import {cartTypes} from './cart.types'

const INITIAL_STATE ={
    cart:[],
    totalPrice: 0
}

const cartReducer = (state = INITIAL_STATE, action) =>{
    let dupCart;
    let itemIndex;
    switch(action.type){
        case cartTypes.ADD_CART:
            dupCart = state.cart
            itemIndex = dupCart.findIndex(ele=>ele.id===action.payload.id)
            if(itemIndex!==-1){
                dupCart[itemIndex] = {
                    ...action.payload,
                    orderedDate: new Date(Date.now()).toDateString(),
                    quantity: dupCart[itemIndex].quantity+1
                }
            }
            else{
                dupCart = dupCart.concat({
                    ...action.payload,
                    orderedDate: new Date(Date.now()).toDateString(),
                    'quantity': 1,
                })
            }
            return{
                totalPrice: (dupCart.length!==0)?dupCart.map(item=>item.price*item.quantity).reduce((sum,total)=>sum+total):0,
                cart: dupCart
            }

        case cartTypes.REMOVE_CART:
            dupCart = state.cart
            dupCart = dupCart.filter(item=>item.id!==action.payload)
            return{
                totalPrice: (dupCart.length!==0)?dupCart.map(item=>item.price*item.quantity).reduce((sum,total)=>sum+total):0,
                cart: dupCart
            }
        
        case cartTypes.INC_ITEM:
            dupCart = state.cart
            itemIndex = dupCart.findIndex(ele=>ele.id===action.payload.id)
            dupCart[itemIndex].quantity = dupCart[itemIndex].quantity+1
            return{
                totalPrice: (dupCart.length!==0)?dupCart.map(item=>item.price*item.quantity).reduce((sum,total)=>sum+total):0,
                cart: dupCart
            }
        case cartTypes.DEC_ITEM:
            dupCart = state.cart
            itemIndex = dupCart.findIndex(ele=>ele.id===action.payload.id)
            if(dupCart[itemIndex].quantity>1){
                dupCart[itemIndex].quantity = dupCart[itemIndex].quantity-1
                return {
                    totalPrice: (dupCart.length!==0)?dupCart.map(item=>item.price*item.quantity).reduce((sum,total)=>sum+total):0,
                    cart: dupCart
                }
            }
            return{
                totalPrice: (dupCart.length!==0)?dupCart.map(item=>item.price*item.quantity).reduce((sum,total)=>sum+total):0,
                cart: state.cart
            }
        case cartTypes.CLEAR_CART:
            return{
                cart: [],
                totalPrice: 0
            }
        default:
            return state
    }
}

export default cartReducer
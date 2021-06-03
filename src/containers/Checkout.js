import React, { Fragment } from 'react'
import OrderItem from '../components/Checkout/CartItem'
import {useHistory} from 'react-router'
import {connect} from 'react-redux'
import {removeFromCart, clearCart} from '../redux/cart/cart.actions'
import {addCollectionsAndDocuments} from '../firebase/firebase.utils'

const Checkout = ({user, cart , removeCart, clearCart, totalPrice}) =>{
    const history = useHistory()
    const placeOrderHandler =() =>{
        addCollectionsAndDocuments('orders', {
            address: user.address,
            items: cart,
            userId: user.id
        })
        clearCart()
        history.push('/')
    }
    return (
        <Fragment>
            <h1 className="text-2xl font-poppins mt-10 mb-14 text-center font-semibold">Shopping Cart</h1>
            <div className="flex flex-row justify-between mx-20">
                <div className="flex flex-col space-y-5" style={{width: '50vw'}}>
                    {cart.length!==0?cart.map(item=>(
                        <OrderItem key={item.id} 
                            id={item.id}
                            item={item}
                            title={item.title} 
                            description={item.description} 
                            removeFromCart={()=>removeCart(item.id)} 
                            img={item.img} 
                            quantity={item.quantity}
                            price={item.price}/>
                    )):<div className="mt-14 font-lg font-roboto text-red-600">Cart is Empty</div>}
                </div>
                <div className="flex flex-col p-10 space-y-8 font-roboto" style={{border: '1px solid #ccc', height: '400px'}}>
                        <h1 className="flex items-start font-semibold text-lg">ORDER OVERVIEW</h1>
                        <div className="flex flex-col align-middle space-y-2 text-base text-gray-600">
                            <div className="flex flex-row justify-between align-middle items-center">
                                <span className="text-sm font-sans text-gray-600 font-bold">Subtotal</span>
                                <span className="text-gray-500">${totalPrice}</span>
                            </div>
                            <div className="flex flex-row justify-between align-middle items-center">
                                <span className="text-sm font-sans text-gray-600 font-bold">Delivery</span>
                                <span className="text-gray-500">$10</span>
                            </div>
                            <div className="flex flex-row justify-between align-middle items-center">
                                <span className="text-sm font-sans text-gray-600 font-bold">The estimated delivery time</span>  
                                <span className="text-gray-600 font-semibold">2-3 days</span>
                            </div>
                            <div className="flex flex-row justify-between align-middle items-center">
                                <span className="text-sm font-sans text-gray-600 font-bold">Subtotal</span>
                                <span className="text-gray-500">${totalPrice+10}</span>
                            </div>
                        </div>
                        <div>
                            <button className="bg-black text-white px-32 py-3 mt-12" onClick={placeOrderHandler}>Order</button>
                        </div>
                </div>
            </div>

        </Fragment>
    )
}

const mapStateToProps = state =>({
    cart: state.cart.cart,
    user: state.user.currentUser,
    totalPrice: state.cart.totalPrice
})
const mapDispatchToProps = dispatch =>({
    removeCart: (id)=>dispatch(removeFromCart(id)),
    clearCart: () => dispatch(clearCart())
})
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
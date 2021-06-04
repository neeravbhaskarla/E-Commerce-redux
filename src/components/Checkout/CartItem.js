import {connect} from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import {removeFromCart, incItemQuantity, decItemQuantity} from '../../redux/cart/cart.actions'

const CartItem=({incQuantity, decQuantity, removeCart, cart, ...props})=>{
    const incrementHandler=(item)=>{
        incQuantity(item)
    }
    const decrementHandler=(item)=>{
        decQuantity(item)
    }
    return(
        <article className="flex flex-col p-3 md:p-1 md:flex-row md:space-x-6 overflow-hidden hover:bg-gray-50 transition-colors duration-700" style={{border : '1px solid #ccd'}}>
            <div>
                <img src={props.img} alt="" style={{height: '150px', width: '250px'}}/>
            </div>
            <div className="flex flex-col w-full px-1 py-2">
                <div className="flex flex-row justify-between">
                    <div className="font-roboto text-md md:text-lg font-medium text-black mb-0.5 capitalize">{props.title}</div>
                </div>
                <div className="flex flex-row justify-items-end align-bottom mt-2">
                        <div className="text-left font-roboto text-xs md:text-sm text-gray-400 font-normal">{props.description}</div>
                </div>
            </div>  
            <div className="flex flex-col justify-between md:p-2">
                <div className="font-roboto text-md md:text-xl text-gray-500 flex justify-end p-2 mx-2">${props.price}</div>
                <div className="flex flex-row space-x-2 md:mx-4">
                <button className="px-1 font-medium" onClick={()=>decrementHandler(props.item)}>-</button>
                <p>{cart.find(item=>item.id===props.id).quantity}</p>
                <button className="px-1 font-medium" onClick={()=>incrementHandler(props.item)}>+</button>
                </div>
                <div className="flex justify-end">
                    <button className="flex flex-row items-center md:align-middle font-poppins md:p-2 text-xs font-normal text-gray-900" onClick={()=>removeCart(props.id)}><CloseIcon style={{height: '15px', width: '15px'}}/> Remove</button>
                </div>
            </div>
        </article>
    )
}
const mapStateToProps = state =>({
    cart: state.cart.cart
})
const mapDispatchToProps = dispatch =>({
    removeCart: (id)=>dispatch(removeFromCart(id)),
    incQuantity: (item)=>dispatch(incItemQuantity(item)),
    decQuantity: (item)=>dispatch(decItemQuantity(item))
})
export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
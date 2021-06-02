import React from 'react'
import StarIcon from '@material-ui/icons/Star'
import StarOutlineIcon from '@material-ui/icons/StarBorderOutlined'
import FavIcon from '@material-ui/icons/Favorite'
import FavOutLineIcon from '@material-ui/icons/FavoriteBorderOutlined'
import AddToCart from  '@material-ui/icons/AddShoppingCart'
import RemoveFromCart from '@material-ui/icons/RemoveShoppingCartOutlined'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart, removeFromCart} from '../../redux/cart/cart.actions'
import {addToWishlist, removeFromWishlist} from '../../redux/wishlist/wishlist.actions'


const ProductItem = ({cart, wishList, addCart, removeCart, addWishlist, removeWishlist, ...props}) =>{
    const onAddToCart =(item)=>{
        if(item.inStock){
            addCart(item)
        }
    }
    const onRemoveWishList=(id)=>{
        removeWishlist(id)
    }
    const onRemoveCartList=(id)=>{
        removeCart(id)
    }
    const onAddWishlist=(item)=>{
        addWishlist(item)
    }
    return(
            <div className="p-4">  
                <div className="rounded-3xl overflow-hidden shadow-lg font-roboto space-y-1 flex-stretch flex-col pb-7 hover:bg-gray-50 transition-colors duration-700 cursor-pointer" style={{width: '320px'}}>
                    <Link to={`/product/${props.id}`}><img className="" src={props.img} style={{height: '220px'}} alt=""/></Link>
                    <div className="px-9 py-4 space-y-2 flex flex-col items-start">
                        <div className="font-normal text-xl text-gray-800 capitalize">{props.title}</div>
                        <div className='font-light text-gray-400 text-sm overflow-hidden' style={{flex: '0 1 22px'}}>{props.description}</div>
                    </div>
                    <div className="flex flex-row px-9">
                            {Array(props.rating+(5-props.rating)).fill().map((_,i)=>(i<props.rating)?<StarIcon key={i} style={{width: "20px"}}/>:<StarOutlineIcon key={i} style={{width: "20px"}}/>)}
                    </div>
                    <div className="px-8">
                        <div className="pt-4 pb-8 mx-2"> 
                            <div className="flex flex-row justify-between items-center">
                                <span className="text-sm text-gray-400 font-normal">{props.inStock?<p>In Stock</p>:<p className='text-red-500'>out of Stock</p>}</span>
                                <span className="text-lg text-gray-500">${props.price}</span>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                                {cart.find(item=>item.id===props.id)?<RemoveFromCart className="ml-2 hover:text-gray-600" style={{width: "25px"}} onClick={()=>onRemoveCartList(props.id)}/>:<AddToCart className="ml-2 hover:text-gray-600" style={{width: "25px"}} onClick={()=>onAddToCart(props.item)}/>}
                                <div className="text-xs px-2 cursor-pointer">
                                    {wishList.find(item=>item.id===props.id)?
                                        <FavIcon className="text-red-600" style={{width: "20px"}} 
                                            onClick={()=>onRemoveWishList(props.id)}/>
                                        :<FavOutLineIcon className="hover:text-red-600" style={{width: "20px"}} 
                                            onClick={()=>onAddWishlist(props.item)}/>}</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
const mapStateToProps = state =>({
    cart: state.cart.cart,
    wishList: state.wishlist.wishlist
})
const mapDispatchToProps = dispatch =>({
    addCart: (item) => dispatch(addToCart(item)),
    removeCart: (id) => dispatch(removeFromCart(id)),
    addWishlist: (item) => dispatch(addToWishlist(item)),
    removeWishlist: (id)=> dispatch(removeFromWishlist(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
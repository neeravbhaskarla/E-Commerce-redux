import React from 'react'
import {useParams} from 'react-router'
import StarIcon from '@material-ui/icons/Star'
import StarOutlineIcon from '@material-ui/icons/StarBorderOutlined'
import FavIcon from '@material-ui/icons/Favorite'
import FavOutLineIcon from '@material-ui/icons/FavoriteBorderOutlined'
import {connect} from 'react-redux'
import {addToCart, removeFromCart} from '../../redux/cart/cart.actions'
import {addToWishlist, removeFromWishlist} from '../../redux/wishlist/wishlist.actions'


const ProductDetail = ({addCart, removeCart, addWishlist, removeWishlist, items, cart, wishList})=>{
    const params = useParams()
    const [category, index] = params.productId.split('_')
    let product = items[encodeURI(category).toLowerCase()].items[index-1]
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
        <div className="flex flex-row font-roboto font-light">
            <div className="flex flex-col md:px-10 py-8 md:py-20 ml-3 md:ml-10 space-y-6 md:space-y-14" style={{width: '60vw', height:'70vh'}}>
                <div className="capitalize text-left text-sm md:text-4xl font-thin font-poppins">
                    {product.title}
                </div>
                <div className="text-xs md:text-sm font-light text-gray-500 text-left md:ml-2">
                    {product.description}
                </div>
                <div className="text-xs md:text-md font-bold text-gray-800 text-left md:ml-2">
                    {product.inStock?<span>In Stock</span>:<span className="text-red-500">Out of Stock</span>}
                </div>
                <div className="flex flex-row justify-start ml-2 md:ml-10">
                            {Array(product.rating+(5-product.rating)).fill().map((_,i)=>(i<product.rating)?<StarIcon key={i} className="ml-1 md:w-40"/>:<StarOutlineIcon key={i} className="ml-1 md:w-40"/>)}
                </div>  
                <div className="font-bold text-left md:text-right md:mr-24 text-xs md:text-lg">
                    Price: <span className="font-light ml-1">${product.price}</span>
                </div>
                <div className="flex flex-row justify-between items-center px-2 md:px-4">
                                <div className="flex items-start mt-3 mb-3 md:mt-0 md:mb-0 mr-24 md:mr-0">
                                    {cart.find(item=>item.id===product.id)?<Button clicked={()=>onRemoveCartList(product.id)}>REMOVE FROM CART</Button>:<Button clicked={()=>onAddToCart(product)}>ADD TO CART</Button>}
                                </div>
                                <div className="text-xs mr-16 cursor-pointer">
                                    {wishList.find(item=>item.id===product.id)?
                                        <FavIcon className="text-red-600" style={{width: "50px"}} 
                                            onClick={()=>onRemoveWishList(product.id)}/>
                                        :<FavOutLineIcon className="hover:text-red-600" style={{width: "50px"}} 
                                            onClick={()=>onAddWishlist(product)}/>}</div>
                        </div>
            </div>
            <div>
                <img src={product.img} className="w-full mt-14 md:mt-0 md:h-full" alt=""/>
            </div>
        </div>
    )
    
}
const Button =(props) =>{
    return <button className="capitalize text-xs w-24 md:w-32 py-2 px-1 md:px-3 md:text-sm bg-black hover:bg-gray-400 text-white -ml-3 font-roboto font-normal transition-colors duration-500" onClick={props.clicked}>{props.children}</button>
}

const mapStateToProps = state =>({
    cart: state.cart.cart,
    items: state.items.items,
    wishList: state.wishlist.wishlist
})
const mapDispatchToProps = dispatch =>({
    addCart: (item) => dispatch(addToCart(item)),
    removeCart: (id) => dispatch(removeFromCart(id)),
    addWishlist: (item) => dispatch(addToWishlist(item)),
    removeWishlist: (id)=> dispatch(removeFromWishlist(id))

})
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
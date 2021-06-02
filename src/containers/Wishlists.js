import React from 'react'
import WishListItem from '../components/ProductItem/ProductItem'
import {connect} from 'react-redux'

const WishLists=({wishlist})=>{
    return(
        <div className="flex flex-col mx-20">
            <div className="p-10 font-poppins text-2xl font-bold">Favorites</div>
            <div className="flex flex-row flex-wrap justify-center">
                {wishlist.length!==0?
                wishlist.map(item=>{
                    return <WishListItem key={item.id}
                            item={item}
                            wishList={item.wishList} 
                            id={item.id} 
                            title={item.title} 
                            rating={item.rating} 
                            img={item.img} 
                            price={item.price} 
                            inStock={item.inStock} 
                            description={item.description}/>
                }):
                <div className="mt-14 font-lg font-roboto text-red-600">No Favorites Found</div>}
            </div>
        </div>
    )
}
const mapStateToProps = state =>({
    wishlist: state.wishlist.wishlist
})
export default connect(mapStateToProps)(WishLists)
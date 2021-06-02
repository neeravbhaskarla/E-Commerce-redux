import React from 'react'
import {useParams} from 'react-router'
import ProductItem from '../components/ProductItem/ProductItem'
import {connect} from 'react-redux'

const SearchResults = ({items}) =>{
    const params = useParams()
    let mainProducts = []
    Object.keys(items).map(item=>(
        Object.keys(items[item].items).map(key=>{
            const product = items[item].items[key]
            if(product.title.toLowerCase().split(/\s+/).includes(params.searchKey) || product.keywords.toLowerCase().split(/\s+/).includes(params.searchKey)){
                mainProducts.push(
                    <ProductItem key={product.id} 
                        item={product}
                        id={product.id} 
                        title={product.title} 
                        rating={product.rating} 
                        img={product.img} 
                        price={product.price} 
                        inStock={product.inStock} 
                        description={product.description}/>
                )
            }
            return null
        })
    ))
    return(
        <div>
            <div className="flex flex-row flex-wrap justify-center overflow-x-hidden">
                {mainProducts.length===0?<h3 className="mt-10">Search results not found</h3>:mainProducts}    
            </div>
        </div>
    )
}
const mapStateToProps = state =>({
    items: state.items.items
})
export default connect(mapStateToProps)(SearchResults)
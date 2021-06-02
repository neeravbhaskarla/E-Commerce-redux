import React from 'react'
import {useParams} from 'react-router'
import ProductItem from '../ProductItem/ProductItem'
import {connect} from 'react-redux'

const CatergoryDetail =({items})=>{
    const params = useParams()
    const category = params.categoryId
    return(
        <div className="flex flex-col p-10 w-screen overflow-x-hidden">
            <div className="flex">
                <h1 className="text-3xl font-poppins">{category}</h1>
            </div>
                <div className="flex flex-row flex-wrap align-middle justify-center mt-8">
                {Object.keys(items).map(item=>{
                    if(encodeURI(category).toLowerCase() === item){
                        return Object.keys(items[item].items).map(key=>{
                                const product = items[item].items[key]
                                return <div className="flex flex-col" key={product.id}>
                                            <ProductItem key={product.id} 
                                                item={product}
                                                id={product.id} 
                                                title={product.title} 
                                                rating={product.rating} 
                                                img={product.img} 
                                                price={product.price} 
                                                inStock={product.inStock} 
                                                description={product.description}/>
                                        </div>
                                                    
                        })}
                        return null
                    }
                )}
                </div>
        </div>
    )
}
const mapStateToProps = state =>({
    items: state.items.items
})
export default connect(mapStateToProps)(CatergoryDetail)
import React, { Fragment, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Hero from '../components/MainPage/Hero'
import ProductItem from '../components/ProductItem/ProductItem'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ScrollContainer from 'react-indiana-drag-scroll'
import {ClipLoader} from 'react-spinners'
import {connect} from 'react-redux'
import {fetchCollectionsStartAsync} from '../redux/items/items.actions'

const MainPage=({items, fetchCollectionsStartAsync, isFetching, errorMessage})=>{
    useEffect(()=>{
            fetchCollectionsStartAsync()
    },[])
    let mainProducts = <ClipLoader size={100} css={`position: absolute; top:40%;`}/>
    if(items!==null){
        mainProducts = Object.keys(items).map(item=>{
                return (
                        <div className="mt-10 mb-20" key={item}>
                            <div className="flex flex-col">
                                <Link to={`/category/${items[item].title}`} className="font-poppins font-medium text-2xl text-gray-600 flex align-bottom justify-items-start mx-12">{items[item].title}</Link>
                                <ScrollContainer className="flex flex-col items-center md:flex-row space-x-2 overflow-x-hidden my-3 px-20 mr-2">
                                    {Object.keys(items[item].items).slice(0,6).map(key=>{
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
                            <div className="flex flex-col">
                            <Link to={`/category/${items[item].routeName}`}>
                                <div className='p-3 rounded-full flex align-middle justify-items-center bg-gray-100 hover:bg-gray-300 cursor-pointer'>
                                   <ArrowForwardIcon/>
                                </div>
                            </Link>
                            </div>
                        </ScrollContainer>
                    </div>
                </div>
                )
        })
    }
    if(errorMessage!==undefined){
        alert(errorMessage)
    }
    return(
        <Fragment>
            <Hero/>
            {mainProducts}
        </Fragment>
    )
}
const mapStateToProps = state =>({
    items: state.items.items,
    isFetching: state.items.isFetching,
    errorMessage: state.items.errorMessage
})
const mapDispatchToProps = dispatch =>({
    fetchCollectionsStartAsync: ()=> dispatch(fetchCollectionsStartAsync())
})
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
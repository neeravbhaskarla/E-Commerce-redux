import React from 'react'
import OrderItem from '../components/OrderItem/OrderItem'
import {connect} from 'react-redux'
const Orders = ({orders}) =>{
    return(
        <ul className="p-8 space-y-5 overflow-y-visible flex flex-col max-w-4xl md:ml-32">
            <div className="flex flex-row">
                <h1 className="text-lg text-center md:text-left md:text-3xl font-semibold">Your Orders</h1>
            </div>
            <div className="flex flex-col md:ml-8">
                {orders.map(item=>(
                        <div key={item.id}>
                            <hr className="m-2 bg-gray-200" style={{padding: '0.5px'}}/>
                            <OrderItem key={item.id} title={item.title} img={item.img} price={item.price} description={item.description} orderedDate={item.orderedDate}/>
                            <hr className="m-1 bg-gray-200" style={{padding: '0.5px'}}/>
                        </div>
                    ))
                }
            </div>

        </ul>
    )
}
const mapStateToProps = state =>({
    orders: state.orders.orders
})
export default connect(mapStateToProps)(Orders)
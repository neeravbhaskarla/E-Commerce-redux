import React, { useContext } from 'react'
import OrderItem from '../components/OrderItem/OrderItem'
import {StoreContext} from '../store/use-context'
const Orders = () =>{
    const storeCtx = useContext(StoreContext)
    return(
        <ul className="p-8 space-y-5 overflow-y-visible flex flex-col max-w-4xl md:ml-32">
            <div className="flex flex-row">
                <h1 className="text-3xl font-semibold">Your Orders</h1>
            </div>
            <div className="flex flex-col md:ml-8">
                {storeCtx.orders.map(ele=>(
                    ele.items.map(item=>(
                        <div>
                            <hr className="m-2 bg-gray-200" style={{padding: '0.5px'}}/>
                            <OrderItem key={item.id} title={item.title} img={item.img} price={item.price} description={item.description} orderedDate={item.orderedDate}/>
                            <hr className="m-1 bg-gray-200" style={{padding: '0.5px'}}/>
                        </div>
                    ))
                ))}
            </div>

        </ul>
    )
}
export default Orders
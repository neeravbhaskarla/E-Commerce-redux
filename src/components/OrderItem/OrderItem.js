import React from 'react'

const OrderItem =(props)=>{
    return(
        <article className="flex flex-row space-x-6 overflow-hidden hover:bg-gray-100 transition-color duration-700">
            <div>
                <img src={props.img} alt="" style={{height: '150px', width: '170px'}}/>
            </div>
            <div className="flex flex-col w-full px-1 py-2">
                <div className="flex flex-row justify-between">
                    <div className="font-roboto text-lg font-semibold text-black mb-0.5 capitalize">{props.title}</div>
                    <div className="font-poppins p-2 text-xs font-normal text-gray-400">*on the way</div>
                </div>
                <div className="flex flex-row p-1 content">
                    <div className="font-poppins text-sm text-gray-400 font-normal">{props.description}</div>
                </div>
                <div className="flex mt-5">
                    <div className="font-roboto font-bold text-xs text-gray-500 flex justify-start">Ordered on:<span className="mx-1 font-normal">{props.orderedDate}</span></div>
                </div>
                    <div className="font-roboto text-lg text-gray-500 flex flex-col text-right p-2">${props.price}</div>
            </div>  
        </article>
    )
}
export default OrderItem
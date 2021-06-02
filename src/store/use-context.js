import React,{ useCallback, useState} from 'react'
// import {DUMMY_PRODUCTS} from '../DummyData'

const authToken = "EioAXuvhQ4iYkqg1tb85vOD6iMVkTL2vlaQuWplR"

export const StoreContext = React.createContext({
    userId: '',
    userDetails: {},
    token: '',
    items:{},
    cart:[],
    wishList:[],
    isSigned: null,
    authToken: null,
    orders:[],
    setUserData:(id)=>{},
    setSignIn: (value)=>{},
    logOut:()=>{},
    checkStatus: ()=>{},
    addToCart: (item)=>{},
    removeFromCart: (id)=>{},
    addToWishList: (item)=>{},
    removeFromWishList: (id)=>{},
    setItems: (item)=>{},
    getUserData: (id) =>{},
    fetchOrders: () =>{},
    placeOrder: ()=>{},
    incQuantity: (item)=>{},
    decQuantity: (item)=>{},
    calucateRemainingTime: (expTime)=>{}
})
export const StoreContextProvider = (props)=>{
    const [items, setItemsState] = useState({})
    const [userDetails, setUserDetails] = useState({})
    const [cart, setCartState] = useState([])
    const [wishList, setWishListState] = useState([])
    const [isSignIn, setIsSignIn] = useState(false)
    const [uId, setUserId] = useState('')
    const [token, setToken] = useState('')
    const [orders, setOrders] = useState([])


    // const onAddHandler =()=>{
    //     const getData = async()=>{
    //         await fetch('https://e-commerce-597b0-default-rtdb.firebaseio.com/store.json',{
    //             method:'PUT',
    //             headers:{
    //                 "Content-Type":'application/json'
    //             },
    //             body: JSON.stringify(DUMMY_PRODUCTS)
    //         })
    //       }
    //     getData()
    // }

    const checkUserHandler=useCallback(()=>{    
        // onAddHandler()
        if(localStorage.getItem('token')!==null){
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
            setIsSignIn(true)
        }
    },[setUserId,setToken,setIsSignIn])

    const addToCartHandler =(item)=>{
        let dupCart = cart
        const itemIndex = dupCart.findIndex(ele=>ele.id===item.id)
        if(itemIndex!==-1){
            dupCart[itemIndex] = {
                ...item,
                orderedDate: new Date(Date.now()).toDateString(),
                quantity: dupCart[itemIndex].quantity+1
            }
        }
        else{
            dupCart = dupCart.concat({
                ...item,
                orderedDate: new Date(Date.now()).toDateString(),
                'quantity': 1,
            })
        }
        setCartState(dupCart)
    }

    const removeFromCartHandler=(id)=>{
        let dupCart = cart
        dupCart = dupCart.filter(item=>item.id!==id)
        setCartState(dupCart)
    }

    const addToWishListHandler = (item) =>{
        let dupWishList = wishList
        dupWishList=dupWishList.concat(item)
        setWishListState(dupWishList)
    }

    const removeFromWishListHandler=(id)=>{
        let dupWishList = wishList
        dupWishList = dupWishList.filter(item=>item.id!==id)
        setWishListState(dupWishList)
    }

    const onItemsSetHandler = useCallback((items) =>{
        setItemsState(items)
    },[])

    const setUserData = useCallback((data)=>{
        setUserDetails(data)
    },[setUserDetails])

    const fetch_users = async(id)=>{
        let UserName, UserEmail, UserAddress
            const queryParams = '?auth=' + authToken + '&orderBy="userId"&equalTo="' + id + '"';
            const res = await fetch('https://e-commerce-597b0-default-rtdb.firebaseio.com/users.json' + queryParams)
            const data = await res.json()
            for(let i in data){
                UserName = await data[i].name
                UserEmail = await data[i].email
                UserAddress = await data[i].address
            }
        setUserDetails({
            name: UserName,
            email: UserEmail,
            address: UserAddress
        })

    }

    const logoutHandler = () =>{
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        setItemsState({})
        setUserDetails({})
        setCartState([])
        setWishListState([])
        setIsSignIn(false)
        setUserId('')
        setToken('')
    }

    const signInHandler = useCallback((value)=>{
        setIsSignIn(value)
    },[setIsSignIn])

    const placeOrderHandler=async()=>{
        if(cart.length === 0){
            alert('No items in the cart')
            return
        }
        const post_order=async()=>{
            const response = await fetch('https://e-commerce-597b0-default-rtdb.firebaseio.com/orders.json?auth='+authToken,{
                method: 'POST',
                body: JSON.stringify({
                    items: cart,
                    userId: localStorage.getItem('userId'),
                    address: userDetails.address
                }),
                headers:{
                    'Content-type': 'application/json'
                }
            }).catch(err=>{
                throw new Error('Something Went wrong')
            })
            if(!response.ok){
                throw new Error('Server error')
            }
        }
        await post_order().then(
            setCartState([])
        ).catch(err=>{
            alert(err)
        })
        await fetch_orders()
    }

    const fetch_orders = async() =>{
        const queryParams = '?auth=' + authToken + '&orderBy="userId"&equalTo="' + uId + '"';
        const order_fetch = async()=>{
            const response = await fetch('https://e-commerce-597b0-default-rtdb.firebaseio.com/orders.json' + queryParams)
            .catch(err=>{
                throw new Error('Something went wrong')   
            })
            if(!response.ok){
                throw new Error('Server Error')
            }
            const data = await response.json()
            let fetchedOrders=[]
            for(let key in data){
                fetchedOrders.push({
                    ...data[key],
                    id: key
                })
            }
            setOrders(fetchedOrders)
        }
        await order_fetch().catch(err=>{
            alert(err)
        })
    }
    const incQuantityHandler=(item)=>{
        let dupCart = cart
        const itemIndex = dupCart.findIndex(ele=>ele.id===item.id)
        setCartState(prev=>{
            prev[itemIndex].quantity = prev[itemIndex].quantity+1
            return [...prev]
        })
    }
    const decQuantityHandler=(item)=>{
        let dupCart = cart
        const itemIndex = dupCart.findIndex(ele=>ele.id===item.id)
        if(dupCart[itemIndex].quantity>1){
            setCartState(prev=>{
                prev[itemIndex].quantity = prev[itemIndex].quantity-1
                return [...prev]
            })
        }
        return
    }
    const calucateRemainingTime=(expirationTime)=>{ // Logout
        const currentTime = new Date().getTime()
        const adjExpirationTime = new Date(expirationTime).getTime()
        const remainingDuration = adjExpirationTime-currentTime
        setTimeout(()=>{
            logoutHandler()
        },remainingDuration)
    }
    
    const contextValue ={
        userId: uId,
        token: token,
        items: items,
        cart: cart,
        wishList: wishList,
        orders: orders,
        isSigned: isSignIn,
        authToken,
        userDetails,
        setUserData: setUserData,
        setSignIn: signInHandler,
        logOut: logoutHandler,
        checkStatus: checkUserHandler,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        addToWishList: addToWishListHandler,
        removeFromWishList: removeFromWishListHandler,
        setItems: onItemsSetHandler,
        getUserData: fetch_users,
        fetchOrders: fetch_orders,
        placeOrder: placeOrderHandler,
        incQuantity: incQuantityHandler,
        decQuantity: decQuantityHandler,
        calucateRemainingTime,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
import React, { useState } from 'react'
import ShoppingLogo from '../assets/svg/Logo.svg'
import SearchIcon from '@material-ui/icons/Search'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import FavIcon from '@material-ui/icons/Favorite'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'
import {useHistory} from 'react-router'
import {connect} from 'react-redux'

const Header=({cart, user})=>{
    const history = useHistory()
    const [searchKey, setSearchKey] = useState('')
    const onSearchKeyChange = (e) =>{
        setSearchKey(e.target.value)
        // console.log(e.target.value)
    }
    const onKeyEnterHandler=(e)=>{
        if(e.key==="Enter"){
            history.push(`/search/${searchKey}`)
        }
    }
    return (
        <nav className='bg-black md:h-14 flex justify-between items-center font-sans flex-col md:flex-row pb-3 md:pb-0'>
            <Link to='/'>
                <img src={ShoppingLogo} alt="" style={{width: '80px'}} className="mx-3"/>
            </Link>
            <div className='flex flex-end md:space-x-7 space-x-3 transition-color mr-3 items-center'>
                <div className='flex items-center md:border-2 rounded-md space-between font-sans '>
                    <input type="text" className='h-7 md:h-9 px-2 text-sm md:w-80 text-gray-500' onChange={onSearchKeyChange} onKeyPress={onKeyEnterHandler}/>
                    <Link to={`/search/${searchKey}`}>
                        <SearchIcon className='bg-gray-100 w-full md:h-12 px-1 hover:bg-gray-300' style={{height: '36px'}}/>
                    </Link>
                </div>
                <Link to={user===null?'/signin':'/profile'} className="flex flex-col hover:text-gray-300 text-white h-10 p-1 mx-1 duration-700 justify-center align-middle">
                    <span className='text-sm font-normal'><ProfileIcon/></span>
                </Link>
                <Link to='/wishlist' className="flex flex-col text-white hover:text-red-600 h-10 p-1 mx-1 duration-700 justify-center align-middle">
                    <FavIcon style={{height:'20px', width:'20px'}} />
                </Link>
                <Link to='/checkout' className="flex flex-row hover:text-gray-300 text-white h-10 p-1 items-center duration-700">
                    <CartIcon/>
                    <span className='text-xs text-white font-bold px-1 text-center font-roboto'>{cart.length}</span>
                </Link>
            </div>
        </nav>
    )
}
const mapStateToProps = state =>({
    user: state.user.currentUser,
    cart: state.cart.cart
})
export default connect(mapStateToProps)(Header)
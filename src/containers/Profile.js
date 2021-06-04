import React from 'react'
import UserProfile from '../assets/svg/profile.svg'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import {Link, useHistory} from 'react-router-dom'
// import {auth} from '../firebase/firebase.utils'
import {connect} from 'react-redux'
import {logOutUser} from '../redux/users/user.actions'

const Profile=({user, orders, logOut})=>{
    const history = useHistory()
    const logOutHandler = () =>{
      logOut()
      history.push('/')
    }
    return(
        <>
        <main>
          <section className="bg-black" style={{ height: "500px" }}>
          </section>
          <section className="relative py-4 bg-gray-200">
            <div className="container mx-auto px-2 md:px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-96">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative flex justify-center">
                        <img
                          alt="..."
                          src={UserProfile}
                          className="bg-white shadow-xl rounded-full h-20 md:h-auto align-middle border-none absolute -m-10 md:-m-16 md:-ml-20 lg:-ml-16"
                          style={{ maxWidth: "150px" }}/>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="md:py-6 px-3 mt-20 md:mt-0 sm:mt-0">
                        <Link to='orders' className="bg-black text-white text-center px-2 md:px-4 py-1 md:py-2 font-sans text-sm md:text-base">Your Orders</Link>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center md:py-4 lg:pt-4 pt-5">
                        <div className="md:mr-4 p-3 text-center">
                          <span className="text-md md:text-xl font-bold block uppercase tracking-wide text-gray-700">
                            {orders.length}
                          </span>
                          <span className="text-xs md:text-sm text-gray-500">Total Orders</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-5 md:mt-12 md:ml-5">
                    <h3 className="text-xl md:text-4xl font-semibold leading-normal text-gray-800 mb-2 capitalize">
                      {user.displayName}
                    </h3>
                    <div className="text-xs md:text-sm leading-normal mt-0 mb-2 text-gray-400 font-normal md:font-bold lowercase">
                      {user.email}
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-1/2 px-4">
                        <h3 className="mb-6 text-md md:text-lg leading-relaxed text-black font-roboto md:-mx-20 font-light text-left">Address</h3>
                        <p className="mb-4 text-xs md:text-md leading-relaxed text-gray-800">
                          {user.address}
                        </p>
                      </div>
                    </div>
                  <div className="mt-10 ml-5 flex justify-center">
                      <button className="flex flex-row items-center align-middle" onClick={logOutHandler}>
                          <div className="text-red-600 text-sm md:text-base">Logout</div><span className="ml-1"><LogoutIcon/></span>
                      </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    )
}
const mapStateToProps=state=>({
  user: state.user.currentUser,
  orders: state.orders.orders
})
const mapDispatchToProps=dispatch=>({
  logOut:()=>dispatch(logOutUser())
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
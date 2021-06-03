import React,{ useEffect } from 'react'
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainPage from './containers/MainPage';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp'
import Checkout from './containers/Checkout'
import Orders from './containers/Orders';
import WishList from './containers/Wishlists';
import Profile from './containers/Profile';
import ProductDetail from './components/ProductDetail/ProductDetail'
import CategoryDetail from './components/CategoryDetail/CategoryDetail'
import SearchResults from './containers/SearchResults';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
// import {DUMMY_PRODUCTS} from './DummyData'
import {connect} from 'react-redux'
import {setUser} from './redux/users/user.actions'


function App({setCurrentUser,user}) {
  useEffect(()=>{
    let unSubscribeUser = null
    unSubscribeUser = auth.onAuthStateChanged(async user=>{
      if(user){
          const userRef = await createUserProfileDocument(user)
          userRef.onSnapshot(snapShot=>{
                  setCurrentUser({
                      id: snapShot.id,
                      ...snapShot.data()
                  })
                })
        }
        // addCollectionsAndDocuments('store',DUMMY_PRODUCTS)
      })
      return () => unSubscribeUser
  },[setCurrentUser])
  let userRoutes = (
    <>
        <Route path='/' exact>
          <MainPage/>
        </Route>
        <Route path='/profile'>
          <Profile/>
        </Route>
        <Route path='/checkout'>
          <Checkout/>
        </Route>
        <Route path='/wishlist'>
          <WishList/>
        </Route>
        <Route path='/orders'>
          <Orders/>
        </Route>
        <Route path='/product/:productId'>
          <ProductDetail/>
        </Route>
        <Route path='/category/:categoryId'>
          <CategoryDetail/>
        </Route>
        <Route path="/search/:searchKey">
          <SearchResults/>
        </Route>
        <Route path='/*' exact>
          <Redirect to='/'/>
        </Route>
    </>
  )
  let authRoutes = (
    <>
      <Route path='/*' exact>
        <Redirect to='/signin'/>
      </Route>
      <Route path='/signin'>
        <SignIn/>
      </Route>
      <Route path='/signup'>
        <SignUp/>
      </Route>
    </>
  )
  return (
    <div className="App">
      <BrowserRouter>
            {user!==null?<Header/>:null}
            <Switch>
              {user!==null? userRoutes:authRoutes}
            </Switch>
      </BrowserRouter>
    </div> 
  );
}
const mapStateToProps = state=>({
  user: state.user.currentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: (user) => dispatch(setUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);

import {ordersTypes} from './orders.types';

import {firestore, getOrdersSnapShot} from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
  type: ordersTypes.FETCH_ORDERS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ordersTypes.FETCH_ORDERS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ordersTypes.FETCH_ORDERS_FAIL,
  payload: errorMessage
});

export const fetchCollectionsOrdersStartAsync = (id) => {
  return dispatch => {
    const collectionRef = firestore.collection('orders')
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        const orders = getOrdersSnapShot(snapshot, id)
        dispatch(fetchCollectionsSuccess(orders));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
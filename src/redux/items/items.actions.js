import {ItemTypes} from './items.types';

import {firestore,convertSnapShotToMap} from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
  type: ItemTypes.FETCH_ITEMS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ItemTypes.FETCH_ITEMS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ItemTypes.FETCH_ITEMS_FAIL,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('store')
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        const collections = convertSnapShotToMap(snapshot)
            let items = {}
            for(let i in collections){
                items[collections[i].routeName] = collections[i]
            }
        dispatch(fetchCollectionsSuccess(items));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
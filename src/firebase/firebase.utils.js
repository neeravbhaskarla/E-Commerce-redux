import firebase from 'firebase'

import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAESAYAQ1kYdTN42bejlrqxOW7vhixEDSY",
    authDomain: "e-commerce-app-2e624.firebaseapp.com",
    projectId: "e-commerce-app-2e624",
    storageBucket: "e-commerce-app-2e624.appspot.com",
    messagingSenderId: "423582577339",
    appId: "1:423582577339:web:e356fe8d6d867aff23af9e",
    measurementId: "G-5KZ4VSJPE3"
};

firebase.initializeApp(firebaseConfig)

export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    if(!snapShot.exists){
        const {displayName, email} = userAuth
        const createdAt = new Date().toISOString()
        try{
            await userRef.set({
                displayName,
                email,
                date: createdAt,
                ...additionalData
            })
        }
        catch(er){
            alert('error has occured', er.message)
        }
    }
    return userRef
}
// export const addCollectionsAndDocuments=(collectionKey, objectsToAdd)=>{
//     const collectionRef = firestore.collection(collectionKey)
//     const batch = firestore.batch()
//     Object.keys(objectsToAdd).map(items=>{
//         const newDocRef = collectionRef.doc()
//         batch.set(newDocRef, {
//             title: items,
//             items: {...objectsToAdd[items]}
//         })
//     })
//     batch.commit()
// }
export const addCollectionsAndDocuments=(collectionKey, objectsToAdd)=>{
    const collectionRef = firestore.collection(collectionKey)
    collectionRef.add(objectsToAdd)
}

export const getOrdersSnapShot = (collections, id) =>{
    const userItems =[]
    collections.docs.map(doc=>{
        const {userId, items} = doc.data()
        if(userId===id){
            items.map(item=>{
                userItems.push(item)
                return null
            })
        }
        return null
    })
    return userItems
}
export const convertSnapShotToMap = (collections)=>{
    const transformedCollection = collections.docs.map(doc=>{
        const {title, items} = doc.data()
        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformedCollection
}
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)
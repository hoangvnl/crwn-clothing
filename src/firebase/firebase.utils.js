import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBD6HvcVoxE7agxrdLW1C_OUBRCRqUgzcQ",
  authDomain: "crwn-db-e0e4c.firebaseapp.com",
  projectId: "crwn-db-e0e4c",
  storageBucket: "crwn-db-e0e4c.appspot.com",
  messagingSenderId: "1971384513",
  appId: "1:1971384513:web:ed9cc2e5e190598526a440",
  measurementId: "G-V5WRRZBQDQ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.collection("users").doc(`${userAuth.uid}`);
  const snapShot = await userRef.get();

  // console.log("userAuth", userAuth);
  // console.log("userRef", userRef);
  // console.log("snapShot", snapShot);

  if (!snapShot.exists) {
    //nếu không tồn tại thì tạo 1 user
    const { email, displayName } = userAuth; //có thể bỏ displayName
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, //có thể bỏ displayName vì displayName đã có trong ...additionalData
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user profile document", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(); //để empty thì nó sẽ tự tạo 1 doc mới với 1 unique key
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      title,
      items,
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

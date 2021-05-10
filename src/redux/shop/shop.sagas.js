import { takeLatest, put, call } from "redux-saga/effects";

import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from "./shop.actions";

import { ShopActionTypes } from "./shop.types";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

  //redux thunk
  //   const collectionRef = firestore.collection("collections");
  //   dispatch(fetchCollectionsStart());
  //   collectionRef
  //     .get()
  //     .then((snapshot) => {
  //       const collectionMap = convertCollectionsSnapshotToMap(snapshot);
  //       // updateCollections(collectionMap);
  //       dispatch(fetchCollectionsSuccess(collectionMap));
  //     })
  //     .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FET_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

import "./App.css";
import React, { useContext, useEffect, useState } from "react";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import {
  auth,
  createUserProfileDocument,
  // addCollectionAndDocuments,
} from "./firebase/firebase.utils";

import { Switch, Route, Redirect } from "react-router-dom";

import CurrentUserContext from "./contexts/current-user/current-user.context";

const App = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const unsubscribeFromAuth = null;
  return (
    <div>
      <CurrentUserContext.Provider value={{ currentUser }}>
        <Header />
      </CurrentUserContext.Provider>
      <Switch>
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

//mapDispatchToProps trả về 1 action

export default App;
// vì app không dùng currentUser.
// vì ngoài việc pass currentUser cho Header, nó chỉ set it mà không dùng tới value

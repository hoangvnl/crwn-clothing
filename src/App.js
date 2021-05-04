import "./App.css";
import React from "react";

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

import { connect } from "react-redux";

// import { selectCollectionForPreview } from "./redux/shop/shop.selector";

import { selectCurrentUser } from "./redux/user/user.selector";
import { setCurrentUser } from "./redux/user/user.action";

import { createStructuredSelector } from "reselect";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //onAuthStateCHanged luôn nghe khi có sự thay đổi về auth trên firebase
      //và thay đổi đó là ở userAuth
      const { setCurrentUser } = this.props;
      // console.log(userAuth);
      if (userAuth) {
        //khi có đăng nhập thì userAuth sẽ giữ thông tin
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        //khi k có đăng nhập thì userAuth sẽ là null
        setCurrentUser(userAuth);
      }
      // addCollectionAndDocuments(
      //   "collections",
      //   collectionArray.map(({ title, items }) => ({ title, items }))
      // );
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionArray: selectCollectionForPreview,
});
//hoặc const mapStateToProps = (state) => ({ currentUser: state.user.currentUser });
//mapStateToProps trả về value của root reducer

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)), //user lúc này sẽ được pass vào user.action và trở thành payload
});
//mapDispatchToProps trả về 1 action

export default connect(mapStateToProps, mapDispatchToProps)(App);
// vì app không dùng currentUser.
// vì ngoài việc pass currentUser cho Header, nó chỉ set it mà không dùng tới value

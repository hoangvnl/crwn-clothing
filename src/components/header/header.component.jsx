import React from "react";

// import { auth } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {
  HeaderContainer,
  OptionLinkContainer,
  OptionsContainer,
  LogoContainer,
} from "./header.styles";

import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";

import { signOutStart } from "../../redux/user/user.action";

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLinkContainer to="/shop">SHOP</OptionLinkContainer>
      <OptionLinkContainer to="/shop">CONTACT</OptionLinkContainer>
      {currentUser ? (
        <OptionLinkContainer as="div" onClick={signOutStart}>
          SIGN OUT
        </OptionLinkContainer>
      ) : (
        <OptionLinkContainer to="/signin"> SIGN IN</OptionLinkContainer>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// const mapStateToProps = ({ user, cart }) => ({
//   currentUser: user.currentUser,
//   hidden: cart.hidden,
// });

// const mapStateToProps = (state) => ({ currentUser: state.user.currentUser }); //state ở đây là root reducer

export default connect(mapStateToProps, mapDispatchToProps)(Header);

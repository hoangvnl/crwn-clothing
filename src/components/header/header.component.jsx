import React, { useContext } from "react";

import { auth } from "../../firebase/firebase.utils";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {
  HeaderContainer,
  OptionLinkContainer,
  OptionsContainer,
  LogoContainer,
} from "./header.styles";

import CurrentUserContext from "../../contexts/current-user/current-user.context";

import { CartContext } from "../../providers/cart/cart.provider";
const Header = () => {
  console.log(useContext(CurrentUserContext));
  const { hidden } = useContext(CartContext);
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLinkContainer to="/shop">SHOP</OptionLinkContainer>
        <OptionLinkContainer to="/shop">CONTACT</OptionLinkContainer>
        {currentUser ? (
          <OptionLinkContainer as="div" onClick={() => auth.signOut()}>
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
};

// const mapStateToProps = ({ user, cart }) => ({
//   currentUser: user.currentUser,
//   hidden: cart.hidden,
// });

// const mapStateToProps = (state) => ({ currentUser: state.user.currentUser }); //state ở đây là root reducer

export default Header;

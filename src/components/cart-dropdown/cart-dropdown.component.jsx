import React, { useContext } from "react";
import "./cart-dropdown.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { withRouter } from "react-router-dom";

import { CartContext } from "../../providers/cart/cart.provider";

const CartDropdown = ({ history }) => {
  const { cartItems, toggleHidden } = useContext(CartContext);
  return (
    //nếu ta không dùng mapDispatchToProps thì dispatch sẽ thành props như thế này
    <div className="cart-dropdown">
      {cartItems.length ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          toggleHidden();
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   cartItems: selectCartItems(state),
// });

export default withRouter(CartDropdown);

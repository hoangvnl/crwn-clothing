import React, { useContext } from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../providers/cart/cart.provider";

const CartIcon = () => {
  const { toggleHidden, cartItemsCount } = useContext(CartContext);
  //toggleHiden sẽ chạy lên kiếm và sẽ thấy ở CartProvider ở App.js
  return (
    <div className="cart-icon" onClick={toggleHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItemsCount}</span>
    </div>
  );
};

export default CartIcon;

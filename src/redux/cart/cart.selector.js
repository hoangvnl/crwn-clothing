import { createSelector } from "reselect";

const selectCart = (state) => state.cart;
//input selector: does not use createSelector

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);
//output selector: dose use input selector and createSelector to build themselves

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);

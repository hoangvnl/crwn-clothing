import React, { useContext } from "react";

import { CartContext } from "../../providers/cart/cart.provider";

import {
  CollectionItemContainer,
  ImageContainer,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer,
  CustomButtonContainer,
} from "./collection-item.styles";

const CollectionItem = ({ item }) => {
  const { name, imageUrl, price } = item;
  const { addItem } = useContext(CartContext);
  return (
    <CollectionItemContainer>
      <ImageContainer style={{ backgroundImage: `url(${imageUrl})` }} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>${price}</PriceContainer>
      </CollectionFooterContainer>
      <CustomButtonContainer onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButtonContainer>
    </CollectionItemContainer>
  );
};

export default CollectionItem;

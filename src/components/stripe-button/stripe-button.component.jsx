import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51ImIIJBfelRsKXX663DuFF1YxIqmDEQkZ4F7QQd02AR3I6BTuqKDmXloZl8Jq38iHdW3ZE7MbTjzXiF3j2vD92ll00v2oy1gs7";

  const onToken = (token) => alert("Your payment successful");
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

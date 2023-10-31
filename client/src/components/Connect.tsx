import React from "react";
import { PlaidLink } from "react-plaid-link";

const PlaidConnectButton = () => {
  // Plaid Link configuration
  const plaidConfig = {
    token: "YOUR_PLAID_PUBLIC_TOKEN", // Replace with your public Plaid token
    onSuccess: (public_token: string, metadata: any) => {
      // Handle the successful connection here, e.g., send public_token to your server
    },
    onExit: (error: any, metadata: any) => {
      // Handle exit events (e.g., user closed the Plaid Link window)
    },
  };

  return (
    <div>
      <h2>Connect your bank account</h2>
      <PlaidLink {...plaidConfig}>
        <button>Connect</button>
      </PlaidLink>
    </div>
  );
};

export default PlaidConnectButton;

import React, { useCallback, useState } from "react";
import axios from "axios";

import { usePlaidLink, PlaidLinkOnSuccess } from "react-plaid-link";

const client_id = "654071b04b5732001c52f1f1";
const secret = "bc7a4a6ca8ef7ead85c8e5bc110313";

const Connect = () => {
  const [token, setToken] = useState<string | null>(null);

  // get link_token from your server when component mounts
  React.useEffect(() => {
    const createLinkToken = async () => {
      const res = await axios.post("http://localhost:4000/plaid/link", {
        client_id,
        secret,
        client_name: "calculator app",
        country_codes: ["US"],
        language: "en",
        products: ["auth"],
      });
      console.log("res:", res);
      if (res.data?.linkToken) {
        setToken(res.data.linkToken);
      }
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>((linkToken, metadata) => {
    // send link_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log(linkToken, metadata);
  }, []);

  console.log("token:", token);
  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    // onEvent
    // onExit
  });

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};

export default Connect;

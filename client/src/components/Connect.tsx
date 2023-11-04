import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { usePlaidLink, PlaidLinkOnSuccess } from "react-plaid-link";
import { Box, Button, Typography } from "@mui/material";
import { findMatchingCompanies } from "../utils";

const client_id = "654071b04b5732001c52f1f1";
const secret = "bc7a4a6ca8ef7ead85c8e5bc110313";

const Connect = () => {
  const [token, setToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  // get link_token from your server when component mounts
  useEffect(() => {
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
        console.log("res.data.linkToken:", res.data.linkToken);
        // const transactions = await axios.post(
        //   "http://localhost:4000/plaid/transactions",
        //   {
        //     access_token: res.data.linkToken,
        //   }
        // );
        // console.log("transactions:", transactions);
      }
    };
    createLinkToken();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/plaid/transactions",
          {
            accessToken,
          }
        );
        console.log("res:", res);
        setTransactions(res.data);
      } catch (e) {
        console.log("e:", e);
      }
    };

    if (accessToken) {
      fetchTransactions();
    }
  }, [accessToken]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (linkToken, metadata) => {
      // send link_token to your server
      // https://plaid.com/docs/api/tokens/#token-exchange-flow
      console.log("onSuccess");
      console.log(linkToken, metadata);
      const res = await axios.post("http://localhost:4000/plaid/exchange", {
        // @ts-ignore
        public_token: metadata.public_token,
      });
      setAccessToken(res.data.accessToken);
    },
    []
  );

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    // onEvent
    // onExit
  });

  const { totalAmount, companyNames } = findMatchingCompanies(
    transactions || []
  );
  console.log("companyNames:", companyNames);
  console.log("totalAmount:", totalAmount);

  return (
    <Box m="3em auto" textAlign={"center"} width={"100vw"}>
      <Typography
        gutterBottom
        variant="h4"
        textAlign={"center"}
        className="title"
      >
        Financial boycotting made easy
      </Typography>
      <Typography variant="body1" textAlign={"center"} mb={4}>
        Find out how much you’ve been spending towards companies that support{" "}
        <strong>Isreal</strong>
      </Typography>

      {transactions.length > 0 ? (
        <Box>
          <Typography variant="h6" color="#DB0403">
            #BoycottIsrael
          </Typography>
          <Typography variant="caption">Past 30 days</Typography>
          <Typography gutterBottom variant="h2" color="#DB0403">
            🩸 ${totalAmount}
          </Typography>
          {companyNames.map((comp) => (
            <Typography variant="h5" textAlign={"center"} color="#DB0403">
              {comp}
            </Typography>
          ))}
        </Box>
      ) : (
        <Button
          variant="contained"
          style={{
            backgroundColor: "#4A3AFF",
            color: "white",
          }}
          onClick={() => open()}
          disabled={!ready}
        >
          Connect bank account
        </Button>
      )}
    </Box>
  );
};

export default Connect;

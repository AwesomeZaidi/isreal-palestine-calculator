import { Router } from "express";
import _ from "lodash";
import plaid, {
  Configuration,
  CountryCode,
  LinkTokenCreateRequest,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";

const plaidRouter = Router();

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  username: 'user_good',
  password: 'pass_good',
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "654071b04b5732001c52f1f1",
      "PLAID-SECRET": "bc7a4a6ca8ef7ead85c8e5bc110313",
    },
  },
});

const client = new PlaidApi(configuration);

plaidRouter.get("/link", async (req, res) => {
  return res.status(200).json("Success");
});

plaidRouter.post("/link", async (req, res) => {
  const request: LinkTokenCreateRequest = {
    user: {
      client_user_id: _.uniqueId(),
    },
    client_name: "Isreal Palestine Calculator",
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: "en",
    webhook: "https://sample-web-hook.com",
  };
  try {
    console.log('in try')
    const response = await client.linkTokenCreate(request);
    console.log('response:', response)
    const linkToken = response.data.link_token;
    return res.status(200).json({
      linkToken,
    });
  } catch (error) {
    // handle error
    console.log('uh oh')
  }
});

export default plaidRouter;

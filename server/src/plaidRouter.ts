import { Router } from "express";
import _ from "lodash";
import plaid, {
  Configuration,
  CountryCode,
  ItemPublicTokenExchangeRequest,
  LinkTokenCreateRequest,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";
import moment from "moment";
import bodyParser from "body-parser";

const plaidRouter = Router();

plaidRouter.use(bodyParser.urlencoded({ extended: false }));

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  username: "user_good",
  password: "pass_good",
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "654071b04b5732001c52f1f1",
      "PLAID-SECRET": "bc7a4a6ca8ef7ead85c8e5bc110313",
    },
  },
});

const client = new PlaidApi(configuration);

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
    // console.log("in try");
    const response = await client.linkTokenCreate(request);
    const linkToken = response.data.link_token;

    
    return res.status(200).json({
      linkToken,
    });
  } catch (error) {
    // handle error
    console.log("uh oh");
  }
});

plaidRouter.post("/exchange", async (req, res) => {

  const {
    public_token
  }: {
    public_token: string
  } = req.body;

  const request: ItemPublicTokenExchangeRequest = {
    public_token,
  };

  try {
    const response = await client.itemPublicTokenExchange(request);
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
  
    return res.status(200).json({
      accessToken,
      itemId
    });
  } catch (error) {
    // handle error
    console.log("uh oh");
  }
});

plaidRouter.post("/transactions", async (req, res) => {
  const {
    accessToken,
  }: {
    accessToken: string;
  } = req.body;
  console.log('accessToken:', accessToken)
  const now = moment(); // Get the current date
  const today = now.format("YYYY-MM-DD");
  const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");

  try {
    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: thirtyDaysAgo,
      end_date: today,
    });

    const transactions = response.data.transactions;
    console.log(
      `You have ${transactions.length} transactions from the last thirty days.`
    );
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

export default plaidRouter;

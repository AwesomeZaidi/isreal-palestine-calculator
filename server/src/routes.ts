import { Router } from "express";
import plaidRouter from "./plaidRouter";

const router = Router();

router.use("/plaid", plaidRouter)

export default router;

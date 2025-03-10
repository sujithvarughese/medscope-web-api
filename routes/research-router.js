import express from "express";
const router = express.Router()
import {fetchConditionInfo, fetchDrugInfo} from "../controllers/research-controller.js"

router.route("/conditions").post(fetchConditionInfo)
router.route("/drugs").post(fetchDrugInfo)

export default router
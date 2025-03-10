import express from "express";
const router = express.Router()
import {fetchBmiResults, fetchHealthRecommendations, fetchSymptomAssessment} from "../controllers/ai-controller.js"

router.route("/symptoms").post(fetchSymptomAssessment)
router.route("/assessment").post(fetchHealthRecommendations)
router.route("/bmi").post(fetchBmiResults)
export default router
import express from 'express'
const router = express.Router()
import { fetchNewsArticles } from "../controllers/news-controller.js"

router.route("/").get(fetchNewsArticles)

export default router
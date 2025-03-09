import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const fetchNewsArticles = async (req, res) => {
  try {
    const responseHealth = await axios("https://newsapi.org/v2/everything?q=health", {
      headers: {
        "X-Api-Key": process.env.X_API_KEY
      }
    })
    let { articles: healthArticles } = responseHealth.data
    const filteredHealthArticles = healthArticles.filter(article => article["urlToImage"] !== null)

    const responseScience = await axios("https://newsapi.org/v2/everything?q=science", {
      headers: {
        "X-Api-Key": process.env.X_API_KEY
      }
    })
    let { articles: scienceArticles } = responseScience.data
    const filteredScienceArticles = scienceArticles.filter(article => article["urlToImage"] !== null)
    res.status(200).json({ filteredScienceArticles, filteredHealthArticles })

  } catch (error) {
    throw new Error(error)
  }

}

export { fetchNewsArticles }
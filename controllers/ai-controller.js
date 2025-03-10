import { OpenAI } from "openai"
import dotenv from 'dotenv'
import axios from "axios";
dotenv.config()
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY })

const fetchSymptomAssessment = async (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose',
    params: {noqueue: '1'},
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: req.body
  };
  try {
    const response = await axios.request(options);
    res.status(200).json(response.data)
  } catch (error) {
    throw new Error(error)
  }
}

const fetchHealthRecommendations = async (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/getHealthRecommendations',
    params: {noqueue: '1'},
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: req.body
  }
  try {
    const response = await axios.request(options);
    res.status(200).json(response.data)
  } catch (error) {
    throw new Error(error)
  }
}

const fetchBmiResults = async (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://bmi.p.rapidapi.com/v1/bmi',
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'bmi.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: req.body
  };
  try {
    const response = await axios.request(options);
    res.status(200).json(response.data)
  } catch (error) {
    throw new Error(error)
  }
}




export { fetchSymptomAssessment, fetchHealthRecommendations, fetchBmiResults }
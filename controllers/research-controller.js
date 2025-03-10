import { OpenAI } from "openai"
import dotenv from 'dotenv'
import axios from "axios";
dotenv.config()
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY })

const fetchConditionInfo = async (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/getMedicalInformation',
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

const fetchDrugInfo = async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      response_format: { "type": "json_object" },
      max_tokens: 550,
      messages: [
        {
          role: "system",
          // {name, description, [uses], directions, precautions, [sideEffects]}
          content: 'You are a helpful assistant designed to provide information about a requested drug. Provide your response in JSON format like this:{"name":"acetaminophen","description":"Acetaminophen is used to relieve mild to moderate pain from headaches, muscle aches, menstrual periods, colds and sore throats, toothaches, backaches, reactions to vaccinations (shots), and to reduce fever. Acetaminophen may also be used to relieve the pain of osteoarthritis (arthritis caused by the breakdown of the lining of the joints). Acetaminophen works by changing the way the body senses pain and by cooling the body.","uses":["headache", "backache", "minor pain of arthritis", "toothache", "muscular aches", "premenstrual and menstrual cramps", "fever"],"directions":"Follow all directions on the product package. For suspensions, shake the medication well before each dose. Some liquids do not need to be aashaken before use. Measure the liquid medication with the provided dose-measuring spoon/dropper/syringe to make sure you have the correct dose. For rapidly-dissolving tablets, chew or allow to dissolve on the tongue, then swallow with or without water. For chewable tablets, chew thoroughly before swallowing.","precautions":Before using this product, tell your doctor or pharmacist your medical history, especially of: liver disease, regular use/abuse of alcohol. Caution is advised if you have diabetes, phenylketonuria (PKU). Tell your doctor if you are pregnant before using this medication. Consult your doctor before breastfeeding." ,"sideEffects":["rash","hives","blistering skin","itching", "difficulty breathing"]}'
        },
        {
          role: "user",
          content: "Retrieve information for the drug lisinopril"
        },
        {
          role: "assistant",
          content: '{"name":"lisinopril", "description":"Lisinopril is used to treat high blood pressure Lowering high blood pressure helps prevent strokes, heart attacks, and kidney problems. It is also used to treat heart failure and to improve survival after a heart attack. Lisinopril works by relaxing blood vessels so blood can flow more easily.","uses": ["diabetic nephropathy", "migraine prevention", "hypertension", "acute myocardial infarction", "chronic heart failure", "scleroderma renal crisis"], "directions":"Take this medication by mouth with or without food as directed by your doctor, usually once daily. If you are using the suspension form of this medication, shake the bottle well before each dose. Carefully measure the dose using a special measuring device.", "precautions":"Before taking lisinopril, tell your doctor or pharmacist if you are allergic to ACE inhibitors (such as benazepril) or if you have any other allergies. Before using this medication, tell your doctor or pharmacist your medical history, especially of: history of an allergic reaction which included swelling of the face/lips/tongue/throat (angioedema), blood filtering procedures (such as LDL apheresis, dialysis), or high level of potassium in the blood.", "sideEffects": ["dizziness", "headache", "dry cough", "diarrhoea", "blurred vision", "mild itching or rash" ]}'
        },
        {
          role: "user",
          content: `Retrieve information for the drug ${drug}`
        }
      ]
    })
    const drugInformationData = JSON.parse(response.choices[0].message.content)
    res.status(200).json({ drugInformationData })
  } catch (error) {
    throw new Error(error)
  }
}

export { fetchConditionInfo, fetchDrugInfo }
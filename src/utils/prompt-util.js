// const OpenAI = require("openai");
// require('dotenv').config();

// const openai = new OpenAI({
//     apiKey:process.env.api_key,
// });



// const getOpenApiResponse = async (resumeTest)=>{
    

//         try{

//             const response = await openai.chat.completions.create({

//             model: 'gpt-4.1',

//             messages: [
//                 {
//                     role:"system" , content: "You are an expert resume reviewer. ",

//                 },

//                 {
//                     role:"user",
//                     content:`Analyse this resume:\n${resumeTest}\n\n Give strength , weaknesses , what can improve and ATS score. `,

//                 }

//             ],
//             max_tokens:250


//             });
//             return response.choices[0].message.content;
//         } catch(error){
//             console.log(error);
//             throw new Error("Failed to get OpenAI response");
//         }

//     };    
            
   

// module.exports = getOpenApiResponse ;


const fetch = require('node-fetch');
require('dotenv').config();





const getOpenApiResponse = async (resumeText) => {

  `in this fun ai analying {resumeTest}  and returning genrated response; `
  const OPENROUTER_API_KEY = process.env.api_key; ///getting {api_key} from env file;

  // prompt for Ai to let it know about its work;
  const prompt = `Analyze this resume and give:
- An ATS compatibility score (0-100)
- Strengths
- Weaknesses
- Summary

    Resume Content:
    ${resumeText}`;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct",
            messages: [{ role: "user", content: prompt }]
        })
        });

    const data = await response.json();
    return {
      analysis: data.choices?.[0]?.message?.content || "No response from model"
    };

  } catch (error) {
    console.error("OpenRouter API error:", error);
    throw new Error("Failed to connect to AI service");
  }
};

module.exports = getOpenApiResponse;


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





// const getOpenApiResponse = async (resumeText) => {

//   `in this fun ai analying {resumeTest}  and returning genrated response; `
//   const OPENROUTER_API_KEY = process.env.api_key; ///getting {api_key} from env file;

//   // prompt for Ai to let it know about its work;
//   const prompt = `Analyze this resume and give:
// - An ATS compatibility score (0-100)
// - Strengths
// - Weaknesses
// - Summary

//     Resume Content:
//     ${resumeText}`;

//     try {
//         const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             model: "mistralai/mistral-7b-instruct",
//             messages: [{ role: "user", content: prompt }]
//         })
//         });

//     const data = await response.json();
//     return {
//       analysis: data.choices?.[0]?.message?.content || "No response from model"
//     };

//   } catch (error) {
//     console.error("OpenRouter API error:", error);
//     throw new Error("Failed to connect to AI service");
//   }
// };

const getOpenApiResponse = async (resumeText) => {
  const OPENROUTER_API_KEY = process.env.api_key;

  // Detailed prompt with JSON output instruction
  const prompt = `
You are a resume analyzer. Analyze the following resume and return a JSON object with these fields:
1. ats_score (0–100)
2. skills_match_score (0–100)
3. technical_strengths (list of 3–5 skills)
4. project_analysis (list of objects with: project_name, technologies_used, description_quality, relevance_to_industry)
5. readability_score (0–100)
6. grammar_issues (list of issues or "None")
7. improvement_suggestions (list of suggestions)
8. final_summary (1-paragraph overview)

Output the response strictly in JSON format only.

Resume:
\`\`\`
${resumeText}
\`\`\`
`;

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

    // Safely parse the returned content
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty response from model");

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (jsonError) {
      console.error("Failed to parse JSON from AI:", jsonError);
      throw new Error("AI did not return valid JSON format");
    }

    return parsed;

  } catch (error) {
    console.error("OpenRouter API error:", error);
    throw new Error("Failed to connect to AI service");
  }
};


module.exports = getOpenApiResponse;


const fs = require("fs");
const pdfParse = require("pdf-parse");
const getOpenApiResponse = require("../utils/prompt-util");
const {StatusCodes} = require("http-status-codes");







const analyzeResume = async (req , res)=>{

    ` this fuction analyzing resume , based on skills and an accomplishment and will provide
    detaild explaination or review of it with Ats score and points which a user can improve;

    Param : PDF FILE:
    `
    try{

        ///cheaking if file is passed there in req or Not;
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "No file uploaded" });
        }

        /// Reading data of the file with fs lib;
        const fileData = await fs.promises.readFile(req.file.path); 

        /// will return an error if the file is empty;
        if(!fileData || fileData.length===0){
            res.status(StatusCodes.BAD_REQUEST).json({Error : "file is Empty!"});
        }

        ///converting or extracting text from filedata avoing images and extra 
        /// with {pdf-parse} lib;
        //it will return , text , numpages , etc;
    
        const data = await pdfParse(fileData);

        /// only taking text;
        const resumeTest = data.text;

        /// Rest of the work will be handle by AI;
        const analyze = await getOpenApiResponse(resumeTest);
        
        /// after getting response from ai , returning  here;
        return res.status(StatusCodes.OK).json(analyze);
        
    }
    catch(error){
        /// error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Failed to analyze resume", details: error.message });
    }

    
};


/// exporting for router;
module.exports = analyzeResume ;


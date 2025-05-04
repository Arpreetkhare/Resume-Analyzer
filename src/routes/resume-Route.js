const express = require("express");
const multer = require("multer");
const {validateToken} = require("../middlewares/user-middleware")


const upload = multer({dest:"uploads/"});
const router = express.Router();
const analyzeResume = require("../controllers/file-Controller")

router.post("/file" , upload.single("file") , validateToken , analyzeResume);

module.exports = router;
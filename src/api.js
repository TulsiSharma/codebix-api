const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const axios=require("axios");
const app = express();
const router = express.Router();
app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.post("/testAPI", (req, res) => {
    var data="";
    axios.post("https://api.jdoodle.com/v1/execute",{
        clientId:req.body.clientId,
        clientSecret:req.body.clientSecret,
        script:req.body.script,
        stdin:req.body.stdin,
        language:req.body.language,
        versionIndex:req.body.versionIndex
    })
    .then(function (response) {
        console.log(response.data);
        data=response.data;
        res.send(data);

      })
      .catch(function (error) {
        console.log(error);
      });
});
router.get("/test",(req,res)=>{
    res.send("hellowwwww");
});
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
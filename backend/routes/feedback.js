const express = require("express");
const router = express.Router();
const feedback = require("../model/Feedback");

router.post("/feedback", async (req, res) => {
    try{
        console.log("in post(/feedback)")
        const jsonBody = await req.body;
        const { title, description } = jsonBody;
        await feedback.create({ title, description });
        return res.json({ jsonBody });
    }
    catch(error){
        console.log(error)
    }
    
});

router.get("/feedback",async (req, res)=>{
    try{
        console.log("in get(/feedback)")
        console.log(res.json(await feedback.find()))
        return res.json(await feedback.find());
    }
    catch(error){
        console.log(error)
    }
    
});

router.post("/vote", async (req,res) => {
    try{
        console.log("in get(/vote)")
        var voteCount = await req.body.votesCount;
        console.log(`VotesCount before update ${voteCount}`)
        // votesCount++;
        const id = await req.body._id;
        // const { title, description } = jsonBody;
        const jsonBody = await feedback.findOneAndUpdate({_id : req.body._id},{$inc: {votesCount:1}});
        const json = await feedback.findOne({_id: req.body._id})
        console.log(`VotesCount after update ${json.votesCount}`)
        return res.json({ jsonBody });
    }catch(error){
        console.log(error)
    }
})
module.exports = router;
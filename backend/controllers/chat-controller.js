const {configureOpenAI} = require("../config/openai-config.js");
const { OpenAIApi } = require('openai');
const User = require('../model/User.js');

console.log("OPENAI_apikey:", process.env.OPENAI_apikey);


const OpenAI = require('openai')
const openai = new OpenAI({apiKey: "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"})  //sneha


const generateChatCompletion = async (
    req, res, next
) => {
    try {
        console.log("in chat controller:")
        console.log(req.body)
        const { message } = req.body
        const user = await User.findOne({name : 'u1'});
        
        console.log(user)

        const chats = user.chats.map(({ role, content }) => ({ role, content })) //as ChatCompletionRequestMessage[]
        chats.push({ content: message, role: "user" })
        user.chats.push({ content: message, role: "user" })
        console.log(chats)

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "gpt-3.5-turbo",
          });
        
          console.log(completion.choices[0]);

        user.chats.push(completion.choices[0].message);

        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong" })
    }
};

module.exports = generateChatCompletion;
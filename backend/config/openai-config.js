const { OpenAIAPI } = require('openai');

const configureOpenAI = () => {
    return new OpenAIAPI({
        key: process.env.OPENAI_apikey,
        organization: process.env.OPENAI_organizationID
    });
    // return new OpenAIAPI(config);
};

module.exports = { configureOpenAI };
const axios = require('axios');

const apiUrl = 'https://api.openai.com/v1/chat/completions';
const apiKey = 'OPENAI_KEY'; // @Please add here your openai key.

async function fetchChatCompletion(chatMessageContent) {
    try {
        const response = await axios.post(
            apiUrl,
            {
                messages: [
                    { role: 'system', content: chatMessageContent },
                ],
                model: 'gpt-3.5-turbo', // Specify the model to use
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        console.log('Chat completion response:', response.data.choices);
        return response.data.choices;
    } catch (error) {
        console.error('Error:', error.response.data);
    }
}


module.exports = {
    fetchChatCompletion
}

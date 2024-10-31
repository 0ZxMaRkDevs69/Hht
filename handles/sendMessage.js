const axios = require('axios');
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

function sendMessage(recipientId, message) {
    axios.post(
        `https://graph.facebook.com/v12.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
        {
            recipient: { id: recipientId },
            message: { text: message },
        }
    ).catch(error => {
        console.error('Error sending message:', error);
    });
}

module.exports = { sendMessage };

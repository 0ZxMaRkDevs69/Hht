const { sendMessage } = require('./sendMessage');

function handlePostback(event) {
    const senderId = event.sender.id;
    const payload = event.postback.payload;

    let reply;

    switch (payload) {
        case 'GET_STARTED':
            reply = 'مرحبًا بك في البوت! ابدأ بإرسال "ChatGPT:" أو "Gemini:" متبوعًا بسؤالك.';
            break;
        default:
            reply = 'لم أفهم طلبك.';
    }

    sendMessage(senderId, reply);
}

module.exports = { handlePostback };

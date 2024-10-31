const { sendMessage } = require('./sendMessage');
const { processCommand } = require('./commands');

function handleMessage(event) {
    const senderId = event.sender.id;
    const message = event.message.text;

    if (message) {
        const reply = processCommand(message);
        sendMessage(senderId, reply);
    }
}

module.exports = { handleMessage };

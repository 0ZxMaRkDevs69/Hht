const { sendMessage } = require('../handles/sendMessage');
const { processCommand } = require('../commands/commands');

function handleMessage(event) {
    const senderId = event.sender.id;
    const message = event.message.text;

    if (message) {
        const reply = processCommand(message);
        sendMessage(senderId, reply);
    }
}

module.exports = { handleMessage };

const express = require('express');
const bodyParser = require('body-parser');
const { handleMessage } = require('./handleMessage');
const { handlePostback } = require('./handlePostback');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// قراءة Verify Token من البيئة
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'default_token';

// التحقق من Webhook
app.get('/webhook', (req, res) => {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('Webhook verified!');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// استقبال الرسائل والـ postbacks
app.post('/webhook', (req, res) => {
    let body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(function(entry) {
            let event = entry.messaging[0];

            if (event.message) {
                handleMessage(event);
            } else if (event.postback) {
                handlePostback(event);
            }
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// بدء السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

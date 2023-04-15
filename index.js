const express = require('express');
const bodyParser = require('body-parser');
const { summarizeText, divideConcepts, generateTitles } = require('./helpers');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/cards', async (req, res) => {
    const text = req.body.text;

    if (!text) {
        return res.status(400).send('Missing required parameter: text');
    }

    const tinyText = summarizeText(text);

    const data = divideConcepts(tinyText);

    console.log(data);
    res.json(data);

});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

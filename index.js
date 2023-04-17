const express = require('express');
const bodyParser = require('body-parser');
const { summarizeText, divideConcepts } = require('./helpers');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/cards', async (req, res) => {
    const { text } = req.body;

    // Verifica que el campo "text" esté presente en el cuerpo de la solicitud
    if (!text) {
        return res.status(400).json({ error: 'Missing required parameter: text' });
    }

    // Verifica que el campo "text" sea una cadena de caracteres
    if (typeof text !== 'string') {
        return res.status(400).json({ error: 'Invalid parameter: text should be a string' });
    }

    const tinyText = summarizeText(text);

    const data = divideConcepts(tinyText);

    console.log(data);
    res.json(data);

});


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

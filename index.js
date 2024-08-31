const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { generate, verify } = require('./service/service');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri);

app.post('/api/generate', async (req, res) => {
    const { junior, senior } = req.body;
    const code = await generate(junior, senior);
    res.json({ code });
});

app.post('/api/verify', async (req, res) => {
    const { code } = req.body;
    const details = await verify(code);
    if (details) {
        res.json({
            detail: 'Verification Successful',
            junior: details.junior,
            senior: details.senior
        });
    } else {
        res.status(400).json({ detail: 'Verification Failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
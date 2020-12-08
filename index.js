const express = require('express');
const dbConnect = require('./config/db')

const app = express();
dbConnect();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Server OK')
})

app.listen(PORT, () => {
    console.log(`servidor en puerto ${PORT}`);
})
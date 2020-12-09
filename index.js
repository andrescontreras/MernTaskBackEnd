const express = require('express');
const dbConnect = require('./config/db')

const app = express();
dbConnect();

app.use(express.json({ extend: true }));

const PORT = process.env.PORT || 4000;

app.use('/api/users', require('./routes/Users'));
app.use('/api/auth', require('./routes/Auth'));
app.use('/api/projects', require('./routes/Projects'));

app.get('/', (req, res) => {
    res.send('Server OK');
})

app.listen(PORT, () => {
    console.log(`servidor en puerto ${PORT}`);
})
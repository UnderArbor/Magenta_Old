const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');

const app = express();

app.use(cors());

connectDB();

// Init Middleware
// app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/deck', require('./routes/api/deck'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

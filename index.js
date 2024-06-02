const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const linkRoutes = require('./routes/links');
const redirectRoutes = require('./routes/redirect');
const db = require('./db'); // ייבוא החיבור למסד הנתונים

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use('/api/users', userRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/re',redirectRoutes)
app.use('//localhost:3000/mytinyurl',redirectRoutes)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
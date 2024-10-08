const express = require('express');
const CORS = require('cors')
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(CORS())

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

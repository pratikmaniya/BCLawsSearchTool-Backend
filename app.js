const express = require('express');
const CORS = require('cors')
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(CORS())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

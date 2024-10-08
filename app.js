const express = require('express');
const CORS = require('cors')
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(CORS())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://pratikmaniya.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const app = express()
const port = process.env.PORT || 8181

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(require('./router/index'));

app.listen(port, () => console.log(`Backend server app listening on port ${port}!`))

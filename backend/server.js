const express = require('express');
const app = express()
const port = process.env.PORT || 8181

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('./routers/index'));

app.listen(port, () => console.log(`Backend server app listening on port ${port}!`))

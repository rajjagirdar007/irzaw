const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
const app = express();
const port = 3024;
const projects = require(path.join(__dirname,'/routes/projects.js')); 
const tags = require(path.join(__dirname,'/routes/tags.js'));
const people = require(path.join(__dirname,'/routes/people.js'));
const expertise = require(path.join(__dirname,'/routes/expertise.js')); 

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));


app.use(express.static(path.join(__dirname, '../front/irzaw/dist')));

app.use('/', projects);
app.use('/', tags);
app.use('/', people);
app.use('/', expertise);

app.use('/images_api', express.static('/var/www/dev.irzaw.com/server/public'));



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/irzaw/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


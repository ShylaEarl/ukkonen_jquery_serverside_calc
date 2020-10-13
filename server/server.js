// requires
const express = require ('express');
const bodyParser = require ('body-parser');
const mathRouter = require('./routes/math_router'); //have to require the route and 'use' it

// globals
const app = express();
const port = 5000;

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/math', mathRouter); //need this to match the require

app.listen(port, () => {
    console.log("up and running on port: ", port);
});




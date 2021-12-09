// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependences
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;
const server = app.listen(port, ()=>{
    console.log(`running on localhost: ${port}`);
})

// GET route that returns the projectData
app.get("/all", function(request,response){
    response.send(projectData);
})

// POST route that adds incoming data to projectData
app.post("/addData", function(request,response){
    projectData.temp = request.body.temp;
    projectData.date = request.body.date;
    projectData.name = request.body.name;
    projectData.userResponse = request.body.userResponse;
    console.log(projectData.temp);
    console.log(projectData.date);
    console.log(projectData.name);
    console.log(projectData.userResponse);
})
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Global variables
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=3144c1b8f87a407ef1334cd8027a702b';
let server = 'http://127.0.0.1:5000';


document.getElementById('generate').addEventListener('click', function(){
    // Get the entered zipcode
    const zip = document.getElementById('zip').value;
    // Get the entered mood
    const mood = document.getElementById('status').value;

    // Alert prompt if zipcode is empty
    if(!zip)
    {
        alert("please enter a Zipcode");
    } 
    else 
    {
        // Promises Chaining 
        getWeather(baseURL,zip,apiKey)
        
        .then(function(data){
    
            const dep = {
                temp: data.main.temp,
                date: newDate,
                name: data.name,
                userResponse: mood
            };
            postWeather(server+'/addData', dep)
        })
        .then(
            updateUI()
        )
    }
})

// GET weather data async function
const getWeather = async (baseURL,zip,key)=>{
    const request = await fetch(baseURL+zip+key)
    try {
        const data = await request.json();
        console.log(data)
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}

// POST weather data async function
const postWeather = async (url='', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const weatherData = await response.json();
        return weatherData
    } catch(error) {
        console.log("error", error);
    }
}

// Update the UI with the acquired values from server
const updateUI = async ()=>{
    const request = await fetch(server+'/all');
    try {
        const allData = await request.json();
        document.getElementById('wrapper').innerHTML = 'Most Recent Entry';
        document.getElementById('name').innerHTML = `state: ${allData.name}`;
        document.getElementById('temp').innerHTML = `temperature: ${allData.temp} F`;
        document.getElementById('date').innerHTML = `date: ${allData.date}`;
        document.getElementById('content').innerHTML = `status: ${allData.userResponse}`;
    } catch(error) {
        console.log('error', error);
    }
}

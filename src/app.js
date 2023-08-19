// root.mjs (or root.js with "type": "module" in package.json)

// 1. Import required modules
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import hbs from "hbs";
import axios from "axios";

// 2. Initialize express app
const app = express();



// 3. Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get __dirname and __filename functionality in ES6 modules
// Define paths for Express configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const partialpath = path.join(__dirname,'../templates/partials/');

console.log("__dirname", __dirname);
console.log("__filename", __filename);
console.log(path.join(__dirname,'../public/index.html'));
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname,'../templates/views/');
const partialsPath=path.join(__dirname,'../templates/partials/');
const errorPagePath = path.join(__dirname, "../public", "404.html");
// console.log("errorPagePath", errorPagePath);
// setup handlebars and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directories
app.use(express.static(publicDirectoryPath));

const fetchWeatherForecast = async (location) => {
  return axios
    .get(
      `http://api.weatherapi.com/v1/forecast.json?key=96696c15098f495880895701231508&q=${location}&days=1&aqi=no&alerts=no`
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

app.get('',(req, res) => {
  res.render('index',{ 
    title:'Weather App',
    name:'Andrew mead'
  })
})

app.get('/weather',(req, res) => {
  if(!req.query.address)
  return res.send({
    error: "you must provide a address term",
  });
  const forecastData= fetchWeatherForecast(req.query.address)
  .then(data=>{
    res.send({
      forecast: "It is snowing",
      location: "Brooklyn",
      address: req.query.address,
      forecastData: data,
    });
  });
  
})

// 4. Routes
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Andrew mead",
  });
});



app.get("/help", (req, res) => {
  res.send([
    {
      name: "help",
      age: 24,
    },
    {
      name: "help2",
      age: 24,
    },
    {
      name: "help3 ",
      age: 24,
    },
  ]);
});

app.get('/products',(req,res)=>{
  console.log("query=",req.query)
  if(req.query?.search!=''){
   return res.send({
    product:['blah']
  })
  }

    res.send({
      error:'you must provide a search term'
    });
}) 

// app.use((req, res, next) => {
//   res.status(404).sendFile(errorPagePath);
// });

app.get('*',(req,res)=>{
  res.render('404')
}) 


// I've removed the duplicate "/help" route you had that would've caused issues
// If you need to handle another case under "/help", you should use another method (like POST) or a different path.

// 5. Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
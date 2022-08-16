// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000 ;


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//your first API endpoint... 

app.get("/api/time/:date?", function (req, res) {
console.log(req.params)



const newdate = req.params.date;

const arr = (newdate.split('-'))
console.log((arr.length))


const date = new Date(newdate).toUTCString()

const timestampInMs =  parseInt((new Date(newdate).getTime() / 1000).toFixed(0))

  
  res.json({ unix : timestampInMs , utc : date   });
});


app.get("/api/:unix", function (req, res) {

const unix = req.params.unix;

 try {
  
  const milliseconds = unix * 1000 // 1575909015000

   const dateObject = new Date(milliseconds).toUTCString()


  res.status(200).json({ unix : unix , utc : dateObject   });
  
 } catch (error) {
   res.status(400).json({massage : error.massage})
 }


});













// listen for requests :)
const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

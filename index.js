const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017/mriirs';
const client = new MongoClient(url);
// Database Name
const dbName = 'mriirs';


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/templates/home.html')
})

app.post('/', function (req, res){
  let a = req.body.user_email
  let b = req.body.user_name
  let c = req.body.user_location
  let d = req.body.user_message
  console.log(a, b, c, d)

  async function main() {
    // Use connect method to connect to the server
    try{
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('complaints');
    // the following code examples can be pasted here...
    let result = await collection.insertOne({email:a, name:b, location:c, message:d})
    return 'done.';
    } catch (e) {
      console.error(e);
    }
  }
  main();
  res.redirect('/')
})

app.listen(3000)
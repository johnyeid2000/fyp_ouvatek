require('./connectdb.js');
require('./bcrypt.js');
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var mysql = require('mysql');
const connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database : "ouvatek"
})

// Connecting to database
connection.connect(function(err) {
	if(err){
	console.log("Error in the connection")
	console.log(err)
	}
	else{
	console.log(`Database Connected`)
	connection.query(`SHOW DATABASES`,
	function (err, result) {
		if(err)
		console.log(`Error executing the query - ${err}`)
		else
		console.log("Result: ",result)
	})
	}
})

app.listen(port, () => {
	console.log(`Backend - 404`)
  })

app.get('/', (req, res) => {
  res.send('Backend - 404')
})

app.get('/patient', function(req,res){ //when going to profile page /users/3939 (3939 should be dynamic using express somewaayyy)
	connection.query(`select * from patient`, function(error,rows,fields){
		if(error) console.log(error);
		else{ console.log(rows); res.send(rows)};
	});
})

app.post('/login', function(req,res){ //needs verification if the values are given at least
	// console.log(req)
	let data = req.body;
	if(data){
		if(data.username && data.password){
			//query 
			//check if user is in table
			//if yes comparePassword() 
				// if true ==> go to mainpage.
				// if false ==> wrong password. 
			//if no -- user not found
			// connection.query(`select * from patient where first_name="${data.username}"`, function(error,rows,fields){
			// 	if(error) console.log(error); //obv check if values are in the table
			// 	else{ console.log(rows); res.send(rows)};
			// });
		}
	}
	// console.log(data.username)
	// hash the password before checking if it is the same. 

})

//handle db
//handle routes
//handles validations 
const bcrypt = require('./bcrypt.js');
const countries = require('./countries.js');
const con = require('./connectdb.js');
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, () => {
	console.log(`Backend - 404`)
  })

app.get('/', (req, res) => {
  res.send('Backend - 404')
})

app.get('/patient', function(req,res){ //when going to profile page /users/3939 (3939 should be dynamic using express somewaayyy)
	con.connection.query(`select * from patient`, function(error,rows,fields){
		if(error) console.log(error);
		else{ console.log(rows); res.send(rows)};
	});
})

app.post('/login', (req,res) => { //needs verification if the values are given at least
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
	// console.log(data.username)
	// hash the password before checking if it is the same.
	const email = req.body.email.toLowerCase().trim(); 
	const password = req.body.password.trim();

	if (!email || !password) {
		return res.status(400).send({ error: 'Email and password are required' });
	}

	// validate the email format
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return res.status(400).send({ error: 'Invalid Email Format' });
	}
	let sql = "SELECT `pat_id`, `email`, `password` FROM `patient` WHERE email=(?)"
	con.connection.query(sql, [email,password], function(error,rows,fields){
		if(error){
			return res.status(404).send({ error: 'User Not Found' });
		}else{
			if(rows.length == 1){
				console.log("hi");
				let result = bcrypt.comparePassword(password, rows[0].password);
				if(result == 1){
					return res.status(200).send({ message: 'Sign in successful' });
				}
				// if(bcrypt.comparePassword(password, rows[0].password)){
				// 	res.send({ message: 'Sign in successful' });
				// }else{
				// 	return res.status(401).send({ error: 'Email or password is incorrect' });
				// }
			}else{
				return res.status(403).send({ error: 'User Not Found' });
			}

		};
	});


	// check if the email and password match your database
	// ...

	// sign in the user
	// ...

});
//handle db
//handle routes
//handles validations 
//countries.getDataUsingAsyncAwaitGetCall();

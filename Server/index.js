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

app.post('/login', (req,res) => {
	const email = req.body.email.toLowerCase().trim(); 
	const password = req.body.password.trim();

	if (!email || !password) {
		return res.status(400).send({ message: 'Email And Password Are Required' });
	}

	// validate the email format
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return res.status(400).send({ message: 'Invalid Email Format' });
	}

	let sql = "SELECT `pat_id`, `email`, `password` FROM `patient` WHERE email=(?)"
	con.connection.query(sql, email, function(error,rows,fields){
		if(error){
			return res.status(404).send({ message: 'User Not Found' });
		}else{
			if(rows.length == 1){
				(async () => {
					let result = await bcrypt.comparePassword(password, rows[0].password);
					if(result == true){
						return res.status(200).send({ message: 'Sign In Successful' });
					}
					else{
						return res.status(401).send({ message: 'Incorrect Username Or Password.' })
					}
				})();			
			}else{
				return res.status(403).send({ message: 'Something Went Wrong.' });
			}
		};
	});
});
//handle db
//handle routes
//handles validations 
//countries.getDataUsingAsyncAwaitGetCall();

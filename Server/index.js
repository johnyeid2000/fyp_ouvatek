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

app.get('/patient', (req,res) => { //when going to profile page /users/3939 (3939 should be dynamic using express somewaayyy)
	con.connection.query(`select * from patient`, function(error,rows,fields){
		if(error) console.log(error);
		else{ console.log(rows); res.send(rows)};
	});
})
app.get('/doctor', (req,res) => { //when going to profile page /users/3939 (3939 should be dynamic using express somewaayyy)
	con.connection.query(`select * from doctor`, function(error,rows,fields){
		if(error) console.log(error);
		else{ console.log(rows); res.send(rows)};
	});
})
app.post('/login', (req,res) => {
	const email = req.body.email.toLowerCase().trim(); 
	const password = req.body.password.trim();
	const checkDoctor = req.body.checked;
	console.log(checkDoctor);
	if (!email || !password) {
		return res.status(400).send({ message: 'Email And Password Are Required' });
	}
	// validate the email format
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return res.status(400).send({ message: 'Invalid Email Format' });
	}
	let sql = "";
	if(checkDoctor){
		sql = "SELECT `dr_id`, `email`, `password` FROM `doctor` WHERE email=(?)"
	}
	else{
		sql = "SELECT `pat_id`, `email`, `password` FROM `patient` WHERE email=(?)"
	}
	con.connection.query(sql, email, function(error,rows,fields){
		if(error){
			return res.status(404).send({ message: 'User Not Found' });
		}else{
			if(rows.length == 1){
				(async () => {
					let result = await bcrypt.comparePassword(password, rows[0].password);
					if(result == true){return res.status(200).send({ message: 'Sign In Successful' });}
					else{return res.status(401).send({ message: 'Incorrect Username Or Password.' })}
				})();			
			}else{return res.status(403).send({ message: 'Something Went Wrong.' });}
		};
	});
});
app.post('/countries', (req, res) => {
	sql = "SELECT * FROM `country`";
	con.connection.query(sql, function(error,rows,fields){
		if(error){
			return res.status(404).send({ message: 'Countries Not Found' });
		}else{
			return res.status(200).send({country});
		};
	});
});
app.post('/signup', (req, res) => {
	const firstName = req.body.firstName.trim();
	const lastName = req.body.lastName.trim();
	const email = req.body.email.toLowerCase().trim();
	const country = req.body.country;
	const phoneNumber = req.body.phoneNumber;
	const password = req.body.password;
	const confPassword = req.body.password;
	const type = req.body.userType;
	if(!firstName){
		return res.status(400).send({ message: 'Missing First Name.' });
	}else{
		if(!lastName){
			return res.status(400).send({ message: 'Missing Last Name.' });
		}else{
			if(!email){
				return res.status(400).send({ message: 'Missing Email.' });
			}else{
				if(!country){
					return res.status(400).send({ message: 'Please Select your Country.' });
				}else{
					if(!phoneNumber){
						return res.status(400).send({ message: 'Missing Phone Number.' });
					}else{
						if(!password){
							return res.status(400).send({ message: 'Missing Password.' });
						}else{
							if(!confPassword){
								return res.status(400).send({ message: 'Missing Password Confirmation.' });
							}else{
								if(!type){
									return res.status(400).send({ message: 'Missing Type of User Sign up.' });
								}
							}
						}
					}
				}

			}
		}
	}
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return res.status(400).send({ message: 'Invalid Email Format.' });
	}
	const phoneRegex = /^\+\d{3} \d{2} \d{3} \d{3}$/;
	if(phoneRegex.test(phoneNumber)){
		return res.status(400).send({ message: 'Invalid Phone Number Format.' });
	}
	if(password!=confPassword){
		return res.status(400).send({ message: '' });
	}

});

app.get('/measurements', (req, res) => {

});


//handle db
//handle routes
//handles validations 
//countries.getDataUsingAsyncAwaitGetCall();

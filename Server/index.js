const bcrypt = require('./bcrypt.js');
const countries = require('./countries.js');
const con = require('./connectdb.js');
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));
const transporter = nodemailer.createTransport({
	service: 'hotmail',
	auth: {
	  user: process.env.MAIL,
	  pass: process.env.PASS
	}
  });

app.listen(port, () => {
	console.log(`Backend - 404`)
})
app.get('/', (req, res) => {
  res.send('Backend - 404')
})
app.get('/api/patient', (req,res) => { //when going to profile page /users/3939 (3939 should be dynamic using express somewaayyy)
	con.connection.query(`select * from patient`, function(error,rows,fields){
		if(error) console.log(error);
		else{ console.log(rows); res.send(rows)};
	});
})
app.get('/api/doctor', (req,res) => { //when going to profile page /users/3939 (3939 should be dynamic using express somewaayyy)
	con.connection.query(`select * from doctor`, function(error,rows,fields){
		if(error) console.log(error);
		else{ console.log(rows); res.send(rows)};
	});
})
app.get('/api/countries', (req, res) => {
	sql = "SELECT * FROM `country`";
	con.connection.query(sql, function(error,rows,fields){
		if(error){
			return res.status(404).send({ message: 'Countries Not Found' });
		}else{
			return res.status(200).send({rows});
		};
	});
});
app.get('/api/medication', (req, res) => {
	sql = "SELECT * FROM `medication`";
	con.connection.query(sql, function(error,rows,fields){
		if(error){
			return res.status(404).send({ message: 'Medications Not Found' });
		}else{
			return res.status(200).send({rows});
		};
	});
});
app.get('/api/bloodtype', (req, res) => {
	sql = "SELECT * FROM `blood_type`";
	con.connection.query(sql, function(error,rows,fields){
		if(error){
			return res.status(404).send({ message: 'Blood Types Not Found' });
		}else{
			return res.status(200).send({rows});
		};
	});
});
app.get('/api/surgeries', (req, res) => {
	sql = "SELECT * FROM `surgeries`";
	con.connection.query(sql, function(error,rows,fields){
		if(error){
			return res.status(404).send({ message: 'Surgeries Not Found' });
		}else{
			return res.status(200).send({rows});
		};
	});
});
app.post('/api/login', (req,res) => {
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
app.post('/api/commonsignup', (req, res) => {
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	let email = req.body.email;
	let country = req.body.country;
	let phoneNumber = req.body.phoneNumber;
	let password = req.body.password;
	let confPassword = req.body.confirmationPassword;
	let isDoctor = req.body.userType;
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
								if(isDoctor == null){
									return res.status(400).send({ message: 'Missing Type of User Sign up.' });
								}
							}
						}
					}
				}
			}
		}
	}
	firstName = firstName.trim();
	lastName = lastName.trim();
	email = email.toLowerCase().trim();
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return res.status(400).send({ message: 'Invalid Email Format.' });
	}
	if(/^[078]\d{8}$/.test(phoneNumber)){
		return res.status(400).send({ message: 'Invalid Phone Number Format.' });
	}
	if(password!=confPassword){
		return res.status(400).send({ message: 'Passwords Do Not Match.' });
	}
	let sql = "";
	if(isDoctor == true){
		sql = "SELECT `dr_id` FROM `doctor` WHERE email=(?)";
	}
	else{
		sql = "SELECT `pat_id` FROM `patient` WHERE email=(?)";
	}
	con.connection.query(sql, email, async function(error,rows,fields){
		if(error){
			return res.status(404).send({ message: 'Duplicate Email' });
		}else{
			if(rows.length > 0){
				return res.status(403).send({ message: 'This email has already a Registered Account.' });
			}
			else{
				let hashpass = await bcrypt.hashPassword(password);
				const today = new Date();
				const year = today.getFullYear();
				const month = String(today.getMonth() + 1).padStart(2, '0'); // add leading zero if needed
				const day = String(today.getDate()).padStart(2, '0'); // add leading zero if needed
				const date = `${year}-${month}-${day}`;
				let sql = "";
				if(isDoctor == true){
					sql = "INSERT INTO `doctor`(`first_name`, `last_name`, `email`, `password`, `country`, `phone_number`, `Acc_Created_On`) VALUES (?, ?, ?, ?, ?, ?, ?)";
				}
				else{
					sql = "INSERT INTO `patient`(`first_name`, `last_name`, `email`, `password`, `phone_number`, `country`, `Acc_Created_On`) VALUES (?, ?, ?, ?, ?, ?, ?)";
				}
				con.connection.query(sql, [firstName, lastName, email, hashpass, country, phoneNumber, date], function(error, result){
					if(error){
						return res.status(403).send({ message: 'Cannot Insert Data - Sign up' });
					}else{
						return res.status(200).send({ message: 'User Created.', userId: result.insertId, isDoctor: isDoctor })
					}
				})
			}
		}
	});
});
app.post('/api/patientsignup', (req, res) => {
	const patId = req.body.id;
	let birthDate = req.body.birthDate;
	let bloodType = req.body.bloodType;
	let firstPregDay = req.body.firstPregnancyDay.trim();
	let medication = req.body.medication;
	let diabetes = req.body.diabetes;
	let hypertension = req.body.hypertension;
	let previousPregnancies = req.body.previousPregnancies;
	let previousSurgeries = req.body.previousSurgeries;
	let sql = "";
	if (patId && birthDate && bloodType && firstPregDay && medication && diabetes && hypertension && previousPregnancies && previousSurgeries) {
		sql = 'UPDATE `patient` SET birth_date = ?, blood_type = ?,\
		first_pregnant_day = ?, medication_taken = ?, diabetes = ?, hypertension = ?,\
		previous_pregnancies = ?, previous_surgeries = ? WHERE pat_id = ?';
		con.connection.query(sql, [birthDate, bloodType, firstPregDay, medication, diabetes, hypertension, previousPregnancies, previousSurgeries, patId], async function(error,result){
			if(error){
				console.log(error);
				return res.status(404).send({ message: 'Patient Signup Issue' });
			}else{
				return res.status(200).send({ result })
			}
		});
	}else{
		console.log(patId , birthDate , bloodType , firstPregDay , medication , diabetes , hypertension , previousPreg , previousSurg);
		return res.status(401).send({ message: 'All Fields Are Required.' });
	}
});
app.post('/api/doctorsignup', (req, res) => {
	const docId = req.body.id;
	let speciality = req.body.speciality;
	let oopnum = req.body.oopnum;
	let gender = req.body.gender;
	let sql = "";
	if (speciality && oopnum && gender) {
		sql = 'UPDATE `doctor` SET oop_number = ?, speciality = ?, gender = ? WHERE dr_id = ?';
		con.connection.query(sql, [oopnum, speciality, gender, docId], async function(error,result){
			if(error){
				console.log(error);
				return res.status(404).send({ message: 'Doctor Signup Issue' });
			}else{
				return res.status(200).send({ result })
			}
		});
	}else{
		return res.status(401).send({ message: 'All Fields Are Required.' });
	}
});
app.post('/api/doctorlocation', (req, res) => {
	let docid = req.body.id;
	let country = req.body.country;
	let city = req.body.city;
	let street = req.body.street;
	let building = req.body.building;
	let floor = req.body.floor;
	let sql = "";
	if(docid && country && city && street && building && floor){
		sql = 'INSERT INTO `doctor_address`(`doctor_id` , `clinic_country`, `clinic_city`, `clinic_street`, `clinic_building`, `clinic_floor`) VALUES (?, ?, ?, ?, ?, ?)';
		con.connection.query(sql, [docid, country, city, street, building, floor], async function(error,result){
			if(error){
				console.log(error);
				return res.status(404).send({ message: 'Doctor Location Signup Issue' });
			}else{
				return res.status(200).send({ result })
			}
		});
	}else{
		return res.status(401).send({ message: 'Missing Required Fields.'})
	}
});
app.post('/api/sendconfirmation', (req,res) => {
	let userid = req.body.id;
	let isDoctor = req.body.isDoctor;
	let sql = "";
	if(isDoctor){
		sql = "SELECT email from `doctor` WHERE dr_id = ?"
	}else{
		sql = "SELECT email from `patient` WHERE pat_id = ?"
	}
	con.connection.query(sql, userid, async function(error,rows, fields){
		if(error){
			return res.status(404).send({ message: 'Finding Email Issue.' });
		}else{
			const code = Math.floor(Math.random() * 900000) + 100000;
			const mailOptions = {
				from: process.env.MAIL,
				to: rows[0].email,
				subject: 'Email Confirmation',
				text: `Thank you for registering with us.\n Your verification Number is: ${code}`
			  };
			  transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
				  	console.log(error);
				  	res.status(404).send('Sending Mail Error:' + error);
				} else {
				  	res.status(200).send('Email sent: ' + info.response);
				}
			  });
		}
	});

})
app.post('/api/sendcode', (req,res) => {
	let confirmationUserid = req.body.id;
	let confirmationIsDoctor = req.body.isDoctor;
	let confirmationCode = req.body.code;
	if(confirmationUserid && confirmationIsDoctor && confirmationCode){
		if(code == confirmationcode &&  userId == confirmationUserid && isDoctor == confirmationIsDoctor){
			res.status(401).send({ message: 'Wrong Verification Code'})
		}
		else{
			res.status(200).send({ message: 'Account Verified. Proceed to Login'})
		}
	}
	else{
		res.status(401).send({ message: 'Verication Code Cant be null.'})
	}
});
//handle db
//handle routes
//handles validations 
//countries.getDataUsingAsyncAwaitGetCall(); 


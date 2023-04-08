const bcrypt = require('./bcrypt.js');
const timer = require('./cleaner.js');
const con = require('./connectdb.js');
const helper = require('./helper.js');
const countries = require('./countries.js'); // used to create the countries table. 
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
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

// -------------------------Shared Information------------------------------- //
app.get('/api/patient', (req,res) => {
	con.connection.query(`select * from patient`, function(error,rows,fields){
		if(error) console.log(error);
		else{ console.log(rows); res.send(rows)};
	});
})
app.get('/api/doctor', (req,res) => {
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
app.get('/api/experience', (req, res) => {
	sql = "SELECT * FROM `experience`";
	con.connection.query(sql, function(error,rows,fields){
		if(error){
			return res.status(404).send({ message: 'Surgeries Not Found' });
		}else{
			return res.status(200).send({rows});
		};
	});
});
// -------------------------Shared Information------------------------------- //

app.post('/api/commonsignup', (req, res) => {
	let firstName = req.body.fname;
	let lastName = req.body.lname;
	let email = req.body.email;
	let country = req.body.selectedCountry;
	let phoneNumber = req.body.phoneNb;
	let password = req.body.password;
	let confPassword = req.body.passwordRepeat;
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
	if(!(/^(03|70|71|76|78|79|81)\d{6}$/).test(phoneNumber)){
		return res.status(400).send({ message: 'Invalid Phone Number Format.' });
	}
	if(password!=confPassword){
		return res.status(400).send({ message: 'Passwords Do Not Match.' });
	}
	let sql = "SELECT `id` FROM `user` WHERE email=(?)";
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
				let	sql = "INSERT INTO `user`(`first_name`, `last_name`, `email`, `password`, `country`, `phone_number`, `user_type`, `created_on`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
				con.connection.query(sql, [firstName, lastName, email, hashpass, country, phoneNumber, isDoctor ,date], function(error, result){
					if(error){
						console.log(error);
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
	let userId = req.body.id;
	let birthDate = req.body.birthDate;
	let bloodType = req.body.selectedBloodType;
	let firstPregDay = req.body.firstPregnancyDay;
	let medication = req.body.selectedMedication;
	let diabetes = req.body.checkDiabetes;
	let hypertension = req.body.checkHypertension;
	let previousPregnancies = req.body.checkPrevPreg;
	let previousSurgeries = req.body.selectedSurgeries;
	let sql = "";
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // add leading zero if needed
	const day = String(today.getDate()).padStart(2, '0'); // add leading zero if needed
	const date = `${year}-${month}-${day}`;
	let trimester = helper.getTrimester(firstPregDay);
	if (userId && birthDate && bloodType && firstPregDay && medication!=null && diabetes!=null && hypertension!=null && previousPregnancies!=null && previousSurgeries!=null) {
		sql = 'INSERT INTO `patient` (user_id, birth_date, blood_type, first_pregnant_day, trimester, medication_taken, diabetes, hypertension, previous_pregnancies, previous_surgeries, created_on) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		con.connection.query(sql, [userId, birthDate, bloodType, firstPregDay, trimester, medication, diabetes, hypertension, previousPregnancies, previousSurgeries, date], async function(error,result){
			if(error){
				console.log(error);
				return res.status(404).send({ message: 'Patient Signup Issue' });
			}else{
				return res.status(200).send({ message: 'Patient Created.', userId: result.insertId, result})
			}
		});
	}else{
		return res.status(401).send({ message: 'All Fields Are Required.' });
	}
});
app.post('/api/doctorsignup', (req, res) => {
	const userId = req.body.id;
	let speciality = req.body.speciality;
	let oopnum = req.body.oopnum;
	let gender = req.body.gender;
	let experience = req.body.experience;
	let biography = req.body.biography;
	let sql = "";
	speciality = speciality.trim();
	biography = biography.trim();
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // add leading zero if needed
	const day = String(today.getDate()).padStart(2, '0'); // add leading zero if needed
	const date = `${year}-${month}-${day}`;
	if (userId && speciality && oopnum && gender) {
		sql = 'INSERT INTO `doctor` (user_id, oop_number, speciality, gender, created_on, experience, biography) VALUES (?, ?, ?, ?, ?, ?, ?)';
		con.connection.query(sql, [userId, oopnum, speciality, gender, date, experience, biography], async function(error,result){
			if(error){
				return res.status(404).send({ message: 'Doctor Signup Issue' });
			}else{
				return res.status(200).send({ message: 'Doctor Created.', doctorId: result.insertId, result })
			}
		});
	}else{
		return res.status(401).send({ message: 'All Fields Are Required.' });
	}
});
app.post('/api/doctorlocation', (req, res) => {
	let doctorId = req.body.doctorId;
	let country = req.body.selectedCountry;
	let city = req.body.city;
	let street = req.body.street;
	let building = req.body.building;
	let floor = req.body.floor;
	let phone = req.body.phoneNumber;
	let sql = "";
	if(doctorId && country && city && street && building && floor && phone){
		sql = 'INSERT INTO `doctor_address`(`doctor_id` , `clinic_country`, `clinic_city`, `clinic_street`, `clinic_building`, `clinic_floor`, `clinic_number`) VALUES (?, ?, ?, ?, ?, ?, ?)';
		con.connection.query(sql, [doctorId, country, city, street, building, floor, phone], async function(error,result){
			if(error){
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
	let sql = "SELECT email from `user` WHERE id = ?"
	con.connection.query(sql, userid, async function(error,rows){
		if(error){
			return res.status(404).send({ message: 'Finding Email Issue.' });
		}else{
			if(rows.length == 1){
				let time = new Date();
				const finalDate = time.toISOString().slice(0, 19).replace('T', ' ');
				const code = Math.floor(Math.random() * 900000) + 100000;
				let sql = "INSERT INTO `confirmation_code` (`user_id`, `confirmation_code`, `created_on`) VALUES (?, ?, ?)";
				con.connection.query(sql, [userid, code, finalDate], async function(error){
					if(error){
						return res.status(404).send({ message: 'Adding verification to database Issue.' });
					}
				});
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
			else{
				return res.status(404).send({ message: 'Email not found.' });
			}
			
		}
	});

})
app.post('/api/forgotpassmail', (req,res) => {
	let email = req.body.email;
	let sql = "SELECT id from `user` WHERE email = ?"
	con.connection.query(sql, email, async function(error,rows){
		if(error){
			return res.status(404).send({ message: 'User Never Registered.' });
		}else{
			if(rows.length == 1){
				let time = new Date();
				const finalDate = time.toISOString().slice(0, 19).replace('T', ' ');
				const code = Math.floor(Math.random() * 900000) + 100000;
				let userid = rows[0].id;
				let sql = "INSERT INTO `confirmation_code` (`user_id`, `confirmation_code`, `created_on`) VALUES (?, ?, ?)";
				con.connection.query(sql, [userid, code, finalDate], async function(error){
					if(error){
						return res.status(404).send({ message: 'Adding verification to database Issue.' });
					}
				});
				const mailOptions = {
					from: process.env.MAIL,
					to: email,
					subject: 'Email Confirmation',
					text: `You have requested a Password Change due to forgeting your password.\n
If you did not do so, kindly disregard this email.\n
Your verification Number is: ${code}`
				  };
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						  console.log(error);
						  res.status(404).send({message: 'Sending Mail Error', reason: error});
					} else {
						  res.status(200).send({message: 'Email sent', userId: userid });
					}
				});
			}else{
				return res.status(404).send({ message: 'User Never Registered.' });
			}
		}
	});

});
app.post('/api/sendcode', (req,res) => {
	let userId = req.body.id;
	let code = req.body.code;
	if(userId && code){
		let sql = "SELECT * FROM `confirmation_code` WHERE user_id = ? ORDER BY `created_on` DESC";
		con.connection.query(sql, userId, async function(error,rows, fields){
			if(error){
				return res.status(404).send({ message: 'Verification Not Issued Or Expired.' });
			}else{
				if(rows.length < 1){
					return res.status(404).send({ message: 'Verification Code Wrong or Expired.' });
				}
				else{
					let confirmationCode =rows[0].confirmation_code;
					if(code == confirmationCode){
						let sql = "DELETE FROM `confirmation_code` WHERE user_id = ?"
						con.connection.query(sql, userId, async function(error, result){
							if(error){
								return res.status(404).send({ message: 'Removing verification from database Issue.' });
							}else{
								return res.status(200).send({ message: 'Account Verified. You can proceed.'})
							}
						});
					}
					else{
						res.status(401).send({ message: 'Verification Code Wrong or Expired'})
					}
				}

			}
		});
	}
	else{
		res.status(401).send({ message: 'Verication Code Cant be null.'})
	}
});
app.post('/api/changepass', (req,res) => {
	let userId = req.body.id;
	let password = req.body.password;
	let confPassword = req.body.passwordRepeat;
	if(confPassword && password && userId){
		if(password!=confPassword){
			return res.status(400).send({ message: 'Passwords Do Not Match.' });
		}else{
			(async() => {
				let pass = await bcrypt.hashPassword(password);
				let sql = 'UPDATE `user` SET password = ? WHERE id=?'
				con.connection.query(sql, [pass, userId], function(error, rows){
					if(error){
						return res.status(404).send({ message: 'User not Found.' });
					}
					else{
						return res.status(200).send({ message: 'Password Changed. Proceed to Login.'})
					}
			});
			})();		
		}
	}else{
		res.status(401).send({message: "Empty fields can not be empty."})
	}
});
app.post('/api/login', (req,res) => {
	const email = req.body.email.toLowerCase().trim(); 
	const password = req.body.password.trim();
	const checkDoctor = req.body.checked;
	if (!email || !password) {
		return res.status(400).send({ message: 'Email And Password Are Required' });
	}
	// validate the email format
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return res.status(400).send({ message: 'Invalid Email Format' });
	}
	let	sql = "SELECT `id`, `email`, `password`, `user_type` FROM `user` WHERE email=(?)";
	con.connection.query(sql, email, function(error,rows,fields){
		if(error){
			return res.status(404).send({ message: 'User Not Found' });
		}else{
			if(rows.length == 1){
				if(rows[0].user_type == checkDoctor){
					(async () => {
						let result = await bcrypt.comparePassword(password, rows[0].password);
						if(result == true){
							let userId = rows[0].id;
							const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: '1h' });
							return res.status(200).send({ message: 'Sign In Successful', token: token });
						}else{
							return res.status(401).send({ message: 'Incorrect Username Or Password.' })
						}
					})();	
				}else{
					return res.status(404).send({ message: 'User Not Found' });
				}
			}else{
				return res.status(403).send({ message: 'Something Went Wrong.' });
			}
		};
	});
});
app.get('/api/profile', (req,res) => {
	(async () => {
		const token = req.headers.authorization.split(' ')[1];
		let result = await helper.validateUser(token);
		if(result.indicator){
			let sql = 'SELECT user.`first_name`, user.`last_name`, user.`email`, user.`phone_number`, user.`country`, user.`user_type`, country.country_name FROM `user` JOIN `country` ON user.country = country.country_id  WHERE id=?';
			con.connection.query(sql, result.value.userId, function(error, rows){
				if(error){
					return res.status(404).send({message: "User Not Found. Login again.", reason: error.message})
				}else{
					if(rows.length == 1){
						let sql = "";
						if(rows[0].user_type){
							sql = "SELECT doctor.`dr_id`, doctor.`oop_number`, doctor.`speciality`, doctor.`gender`,\
							doctor.`biography`, doctor.`experience`, experience.`exp_years`, doctor_address.* , country.country_name FROM `doctor`\
							JOIN `experience` ON doctor.experience = experience.exp_id\
							JOIN `doctor_address` ON doctor.dr_id = doctor_address.doctor_id\
							JOIN `country` ON doctor_address.clinic_country = country.country_id\
							WHERE user_id=?"
							con.connection.query(sql, result.value.userId, function(error, rowsSpecific){
								if(error){
									return res.status(404).send({message: "User Not Found. Login again.", reason: error.message})
								}else{
									return res.status(200).send({userData: rows[0], specificData: rowsSpecific[0]})
								}
							});
						}else{
							sql = "SELECT patient.`birth_date`, patient.`first_pregnant_day`, patient.`trimester`,\
							patient.`blood_type`, patient.`medication_taken`, patient.`previous_surgeries`, patient.`diabetes`,\
							patient.`hypertension`, patient.`previous_pregnancies`, blood_type.`type_name`, medication.`medication_name`,\
							surgeries.`surgeries_name`, trimester.`trimester_name` FROM `patient`\
							JOIN `blood_type` ON patient.blood_type = blood_type.type_id\
							JOIN `medication` ON patient.medication_taken = medication.medication_id\
							JOIN `surgeries` ON patient.blood_type = surgeries.surgeries_id\
							JOIN `trimester` ON patient.blood_type = trimester.trimester_id\
							WHERE user_id=?"
							con.connection.query(sql, result.value.userId, function(error, rowsSpecific){
								rowsSpecific[0].birthDate = helper.fixDate(rowsSpecific[0].birth_date);
								if(error){
									return res.status(404).send({message: "User Not Found. Login again.", reason: error.message})
								}else{
									return res.status(200).send({userData: rows[0], specificData: rowsSpecific[0]})
								}
							});
						}
					}
					else{
						return res.status(401).send({ message: "You are not an authorized user." , reason: error})
					}
				}
			});
		}else{
			return res.status(401).send({ message: "You are not an authorized user." , reason: result.value})
		}
	})();
});
app.post('/api/editcommon', (req, res) => {

});
//countries.getDataUsingAsyncAwaitGetCall();
timer.cleanVerification(); //cleans the database from verification codes that have been there for more than 10 minutes
// timer.updateTrimester();

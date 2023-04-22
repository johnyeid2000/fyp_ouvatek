const values = require("./values.json");
const bcrypt = require("./bcrypt.js");
const timer = require("./cleaner.js");
const con = require("./connectdb.js");
const helper = require("./helper.js");
const countries = require("./countries.js"); // used to create the countries table.
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
const { fixDate } = require("./helper.js");
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS,
  },
});
app.listen(port, () => {
  console.log(`Backend - 404`);
});
app.get("/", (req, res) => {
  res.send("Backend - 404");
});

// -------------------------Shared Information------------------------------- //
app.get("/api/patient", (req, res) => {
  con.connection.query(`select * from patient`, function (error, rows, fields) {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(rows);
    }
  });
});
app.get("/api/doctor", (req, res) => {
  con.connection.query(`select * from doctor`, function (error, rows, fields) {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(rows);
    }
  });
});
app.get("/api/countries", (req, res) => {
  sql = "SELECT * FROM `country`";
  con.connection.query(sql, function (error, rows, fields) {
    if (error) {
      return res.status(404).send({ message: "Countries Not Found" });
    } else {
      return res.status(200).send({ rows });
    }
  });
});
app.get("/api/medication", (req, res) => {
  sql = "SELECT * FROM `medication`";
  con.connection.query(sql, function (error, rows, fields) {
    if (error) {
      return res.status(404).send({ message: "Medications Not Found" });
    } else {
      return res.status(200).send({ rows });
    }
  });
});
app.get("/api/bloodtype", (req, res) => {
  sql = "SELECT * FROM `blood_type`";
  con.connection.query(sql, function (error, rows, fields) {
    if (error) {
      return res.status(404).send({ message: "Blood Types Not Found" });
    } else {
      return res.status(200).send({ rows });
    }
  });
});
app.get("/api/surgeries", (req, res) => {
  sql = "SELECT * FROM `surgeries`";
  con.connection.query(sql, function (error, rows, fields) {
    if (error) {
      return res.status(404).send({ message: "Surgeries Not Found" });
    } else {
      return res.status(200).send({ rows });
    }
  });
});
app.get("/api/experience", (req, res) => {
  sql = "SELECT * FROM `experience`";
  con.connection.query(sql, function (error, rows, fields) {
    if (error) {
      return res.status(404).send({ message: "Surgeries Not Found" });
    } else {
      return res.status(200).send({ rows });
    }
  });
});
// -------------------------Shared Information------------------------------- //

// -------------------------Functionalities------------------------------- //
app.post("/api/commonsignup", (req, res) => {
  let firstName = req.body.fname;
  let lastName = req.body.lname;
  let email = req.body.email;
  let country = req.body.selectedCountry;
  let phoneNumber = req.body.phoneNb;
  let password = req.body.password;
  let confPassword = req.body.passwordRepeat;
  let isDoctor = req.body.userType;
  if (!firstName) {
    return res.status(400).send({ message: "Missing First Name." });
  } else {
    if (!lastName) {
      return res.status(400).send({ message: "Missing Last Name." });
    } else {
      if (!email) {
        return res.status(400).send({ message: "Missing Email." });
      } else {
        if (!country) {
          return res
            .status(400)
            .send({ message: "Please Select your Country." });
        } else {
          if (!phoneNumber) {
            return res.status(400).send({ message: "Missing Phone Number." });
          } else {
            if (!password) {
              return res.status(400).send({ message: "Missing Password." });
            } else {
              if (!confPassword) {
                return res
                  .status(400)
                  .send({ message: "Missing Password Confirmation." });
              } else {
                if (isDoctor == null) {
                  return res
                    .status(400)
                    .send({ message: "Missing Type of User Sign up." });
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
    return res.status(400).send({ message: "Invalid Email Format." });
  }
  if (!/^(03|70|71|76|78|79|81)\d{6}$/.test(phoneNumber)) {
    return res.status(400).send({ message: "Invalid Phone Number Format." });
  }
  if (password != confPassword) {
    return res.status(400).send({ message: "Passwords Do Not Match." });
  }
  let sql = "SELECT `id` FROM `user` WHERE email=(?)";
  con.connection.query(sql, email, async function (error, rows, fields) {
    if (error) {
      return res.status(404).send({ message: "Duplicate Email" });
    } else {
      if (rows.length > 0) {
        return res
          .status(403)
          .send({ message: "This email has already a Registered Account." });
      } else {
        let hashpass = await bcrypt.hashPassword(password);
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // add leading zero if needed
        const day = String(today.getDate()).padStart(2, "0"); // add leading zero if needed
        const date = `${year}-${month}-${day}`;
        let sql =
          "INSERT INTO `user`(`first_name`, `last_name`, `email`, `password`, `country`, `phone_number`, `user_type`, `created_on`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        con.connection.query(
          sql,
          [
            firstName,
            lastName,
            email,
            hashpass,
            country,
            phoneNumber,
            isDoctor,
            date,
          ],
          function (error, result) {
            if (error) {
              console.log(error);
              return res
                .status(403)
                .send({ message: "Cannot Insert Data - Sign up" });
            } else {
              return res
                .status(200)
                .send({
                  message: "User Created.",
                  userId: result.insertId,
                  isDoctor: isDoctor,
                });
            }
          }
        );
      }
    }
  });
});
app.post("/api/patientsignup", (req, res) => {
  let userId = req.body.id;
  let birthDate = req.body.birthDate;
  let bloodType = req.body.selectedBloodType;
  let firstPregDay = req.body.firstPregnancyDay;
  let medication = req.body.selectedMedication;
  let diabetes = req.body.checkDiabetes;
  let hypertension = req.body.checkHypertension;
  let previousPregnancies = req.body.checkPrevPreg;
  let previousSurgeries = req.body.selectedSurgeries;
  let height = req.body.height;
  let sql = "";
  if (height <= 0) {
    return res.status(401).send({ message: "Null Height Value." });
  }
  if (height > 2.5) {
    return res
      .status(401)
      .send({
        message: "Height Value is in Meters. Fix your input accordingly.",
      });
  }
  if (diabetes == true || diabetes == "true") {
    diabetes = 1;
  } else {
    diabetes = 0;
  }
  if (hypertension == true || hypertension == "true") {
    hypertension = 1;
  } else {
    hypertension = 0;
  }
  if (previousPregnancies == true || previousPregnancies == "true") {
    previousPregnancies = 1;
  } else {
    previousPregnancies = 0;
  }
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // add leading zero if needed
  const day = String(today.getDate()).padStart(2, "0"); // add leading zero if needed
  const date = `${year}-${month}-${day}`;
  let trimester = helper.getTrimester(firstPregDay);
  if (
    userId &&
    birthDate &&
    height &&
    bloodType &&
    firstPregDay &&
    medication != null &&
    diabetes != null &&
    hypertension != null &&
    previousPregnancies != null &&
    previousSurgeries != null
  ) {
    sql =
      "INSERT INTO `patient` (user_id, birth_date, height, blood_type, first_pregnant_day, trimester, medication_taken, diabetes, hypertension, previous_pregnancies, previous_surgeries, created_on) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    con.connection.query(
      sql,
      [
        userId,
        birthDate,
        height,
        bloodType,
        firstPregDay,
        trimester,
        medication,
        diabetes,
        hypertension,
        previousPregnancies,
        previousSurgeries,
        date,
      ],
      async function (error, result) {
        if (error) {
          console.log(error);
          return res.status(404).send({ message: "Patient Signup Issue" });
        } else {
          return res
            .status(200)
            .send({
              message: "Patient Created.",
              userId: result.insertId,
              result,
            });
        }
      }
    );
  } else {
    return res.status(401).send({ message: "All Fields Are Required." });
  }
});
app.post("/api/doctorsignup", (req, res) => {
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
  const month = String(today.getMonth() + 1).padStart(2, "0"); // add leading zero if needed
  const day = String(today.getDate()).padStart(2, "0"); // add leading zero if needed
  const date = `${year}-${month}-${day}`;
  if (userId && speciality && oopnum && gender && experience) {
    sql =
      "INSERT INTO `doctor` (user_id, oop_number, speciality, gender, created_on, experience, biography) VALUES (?, ?, ?, ?, ?, ?, ?)";
    con.connection.query(
      sql,
      [userId, oopnum, speciality, gender, date, experience, biography],
      async function (error, result) {
        if (error) {
          return res.status(404).send({ message: "Doctor Signup Issue" });
        } else {
          return res
            .status(200)
            .send({
              message: "Doctor Created.",
              doctorId: result.insertId,
              result,
            });
        }
      }
    );
  } else {
    return res.status(401).send({ message: "All Fields Are Required." });
  }
});
app.post("/api/doctorlocation", (req, res) => {
  let doctorId = req.body.doctorId;
  let country = req.body.selectedCountry;
  let city = req.body.city;
  let street = req.body.street;
  let building = req.body.building;
  let floor = req.body.floor;
  let phone = req.body.phoneNumber;
  if (!/^(03|70|71|76|78|79|81)\d{6}$/.test(phone)) {
    return res.status(400).send({ message: "Invalid Phone Number Format." });
  }
  let sql = "";
  if (doctorId && country && city && street && building && floor && phone) {
    sql =
      "INSERT INTO `doctor_address`(`doctor_id` , `clinic_country`, `clinic_city`, `clinic_street`, `clinic_building`, `clinic_floor`, `clinic_number`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    con.connection.query(
      sql,
      [doctorId, country, city, street, building, floor, phone],
      async function (error, result) {
        if (error) {
          return res
            .status(404)
            .send({ message: "Doctor Location Signup Issue" });
        } else {
          return res.status(200).send({ result });
        }
      }
    );
  } else {
    return res.status(401).send({ message: "Missing Required Fields." });
  }
});
app.post("/api/sendconfirmation", (req, res) => {
  let userid = req.body.id;
  let sql = "SELECT email from `user` WHERE id = ?";
  con.connection.query(sql, userid, async function (error, rows) {
    if (error) {
      return res.status(404).send({ message: "Finding Email Issue." });
    } else {
      if (rows.length == 1) {
        let time = new Date();
        const finalDate = time.toISOString().slice(0, 19).replace("T", " ");
        const code = Math.floor(Math.random() * 900000) + 100000;
        let sql =
          "INSERT INTO `confirmation_code` (`user_id`, `confirmation_code`, `created_on`) VALUES (?, ?, ?)";
        con.connection.query(
          sql,
          [userid, code, finalDate],
          async function (error) {
            if (error) {
              return res
                .status(404)
                .send({ message: "Adding verification to database Issue." });
            }
          }
        );
        const mailOptions = {
          from: process.env.MAIL,
          to: rows[0].email,
          subject: "Email Confirmation",
          text: `Thank you for registering with us.\n Your verification Number is: ${code}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.status(404).send("Sending Mail Error:" + error);
          } else {
            res.status(200).send("Email sent: " + info.response);
          }
        });
      } else {
        return res.status(404).send({ message: "Email not found." });
      }
    }
  });
});
app.post("/api/forgotpassmail", (req, res) => {
  let email = req.body.email;
  let sql = "SELECT id from `user` WHERE email = ?";
  con.connection.query(sql, email, async function (error, rows) {
    if (error) {
      return res.status(404).send({ message: "User Never Registered." });
    } else {
      userid = rows[0].id;
      if (rows.length == 1) {
        return res
          .status(200)
          .send({ message: "User Verified", userId: userid });
      } else {
        return res.status(404).send({ message: "User Never Registered." });
      }
    }
  });
});
app.post("/api/forgetpasswordsendemail", (req, res) => {
  let email = req.body.email;
  let userid = req.body.id;
  let time = new Date();
  const finalDate = time.toISOString().slice(0, 19).replace("T", " ");
  const code = Math.floor(Math.random() * 900000) + 100000;
  let sql =
    "INSERT INTO `confirmation_code` (`user_id`, `confirmation_code`, `created_on`) VALUES (?, ?, ?)";
  con.connection.query(sql, [userid, code, finalDate], async function (error) {
    if (error) {
      return res
        .status(404)
        .send({ message: "Adding verification to database Issue." });
    } else {
      const mailOptions = {
        from: process.env.MAIL,
        to: email,
        subject: "Email Confirmation",
        text: `You have requested a Password Change due to forgeting your password.\n
If you did not do so, kindly disregard this email.\n
Your verification Number is: ${code}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res
            .status(404)
            .send({ message: "Sending Mail Error", reason: error });
        } else {
          return res.status(200).send({ message: "Email sent" });
        }
      });
    }
  });
});
app.post("/api/sendcode", (req, res) => {
  let userId = req.body.id;
  let code = req.body.code;
  if (userId && code) {
    let sql =
      "SELECT * FROM `confirmation_code` WHERE user_id = ? ORDER BY `created_on` DESC";
    con.connection.query(sql, userId, async function (error, rows, fields) {
      if (error) {
        return res
          .status(404)
          .send({ message: "Verification Not Issued Or Expired." });
      } else {
        if (rows.length < 1) {
          return res
            .status(404)
            .send({ message: "Verification Code Wrong or Expired." });
        } else {
          let confirmationCode = rows[0].confirmation_code;
          if (code == confirmationCode) {
            let sql = "DELETE FROM `confirmation_code` WHERE user_id = ?";
            con.connection.query(sql, userId, async function (error, result) {
              if (error) {
                return res
                  .status(404)
                  .send({
                    message: "Removing verification from database Issue.",
                  });
              } else {
                return res
                  .status(200)
                  .send({ message: "Account Verified. You can proceed." });
              }
            });
          } else {
            return res
              .status(401)
              .send({ message: "Verification Code Wrong or Expired" });
          }
        }
      }
    });
  } else {
    return res.status(401).send({ message: "Verication Code Cant be null." });
  }
});
app.post("/api/changepass", (req, res) => {
  let userId = req.body.id;
  let password = req.body.password;
  let confPassword = req.body.passwordRepeat;
  if (confPassword && password && userId) {
    if (password != confPassword) {
      return res.status(400).send({ message: "Passwords Do Not Match." });
    } else {
      (async () => {
        console.log(password);
        console.log(userId);
        let pass = await bcrypt.hashPassword(password);
        let sql = "UPDATE `user` SET password = ? WHERE id=?";
        con.connection.query(sql, [pass, userId], function (error, result) {
          if (error) {
            return res.status(404).send({ message: "User not Found." });
          } else {
            console.log(result);
            return res
              .status(200)
              .send({ message: "Password Changed. Proceed to Login." });
          }
        });
      })();
    }
  } else {
    res.status(401).send({ message: "Empty fields can not be empty." });
  }
});
app.post("/api/login", (req, res) => {
  const email = req.body.email.toLowerCase().trim();
  const password = req.body.password.trim();
  const checkDoctor = req.body.checked;
  if (!email || !password) {
    return res.status(400).send({ message: "Email And Password Are Required" });
  }
  // validate the email format
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).send({ message: "Invalid Email Format." });
  }
  let sql =
    "SELECT `id`, `email`, `password`, `user_type` FROM `user` WHERE email=(?)";
  con.connection.query(sql, email, function (error, rows, fields) {
    if (error) {
      return res.status(404).send({ message: "User Not Found." });
    } else {
      if (rows.length == 1) {
        if (rows[0].user_type == checkDoctor) {
          (async () => {
            let result = await bcrypt.comparePassword(
              password,
              rows[0].password
            );
            if (result == true) {
              let userId = rows[0].id;
              const token = jwt.sign({ userId }, process.env.SECRET, {
                expiresIn: "1h",
              });
              return res
                .status(200)
                .send({ message: "Sign In Successful.", token: token });
            } else {
              return res
                .status(401)
                .send({ message: "Incorrect Username Or Password." });
            }
          })();
        } else {
          return res.status(404).send({ message: "User Not Found." });
        }
      } else {
        return res.status(403).send({ message: "Something Went Wrong." });
      }
    }
  });
});
app.get("/api/profile", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let sql =
        "SELECT user.`first_name`, user.`last_name`, user.`email`, user.`phone_number`, user.`country`, user.`user_type`, country.country_name FROM `user` JOIN `country` ON user.country = country.country_id  WHERE id=?";
      con.connection.query(sql, result.value.userId, function (error, rows) {
        if (error) {
          return res
            .status(404)
            .send({
              message: "User Not Found. Login again.",
              reason: error.message,
            });
        } else {
          if (rows.length == 1) {
            let sql = "";
            if (rows[0].user_type) {
              sql =
                "SELECT doctor.`dr_id`, doctor.`oop_number`, doctor.`speciality`, doctor.`gender`,\
							doctor.`biography`, doctor.`experience`, experience.`exp_years`, doctor_address.* , country.country_name FROM `doctor`\
							JOIN `experience` ON doctor.experience = experience.exp_id\
							JOIN `doctor_address` ON doctor.dr_id = doctor_address.doctor_id\
							JOIN `country` ON doctor_address.clinic_country = country.country_id\
							WHERE user_id=?";
              con.connection.query(
                sql,
                result.value.userId,
                function (error, rowsSpecific) {
                  if (error) {
                    return res
                      .status(404)
                      .send({
                        message: "User Not Found. Login again.",
                        reason: error.message,
                      });
                  } else {
                    let clinics = [];
                    rowsSpecific.forEach((line) => {
                      let clinic = {};
                      clinic.clinic_id = line.clinic_id;
                      clinic.country = line.country_name;
                      clinic.country_id = line.clinic_country;
                      clinic.number = line.clinic_number;
                      clinic.floor = line.clinic_floor;
                      clinic.building = line.clinic_building;
                      clinic.street = line.clinic_street;
                      clinic.city = line.clinic_city;
                      clinics.push(clinic);
                    });
                    let doctorData = {};
                    doctorData.dr_id = rowsSpecific[0].dr_id;
                    doctorData.oop_number = rowsSpecific[0].oop_number;
                    doctorData.speciality = rowsSpecific[0].speciality;
                    doctorData.gender = rowsSpecific[0].gender;
                    doctorData.biography = rowsSpecific[0].biography;
                    doctorData.experience = rowsSpecific[0].experience;
                    doctorData.exp_years = rowsSpecific[0].exp_years;
                    return res
                      .status(200)
                      .send({
                        userData: rows[0],
                        specificData: doctorData,
                        address: clinics,
                      });
                  }
                }
              );
            } else {
              sql =
                "SELECT patient.`birth_date`, patient.`first_pregnant_day`, patient.`trimester`,\
							patient.`blood_type`, patient.`medication_taken`, patient.`previous_surgeries`, patient.`diabetes`,\
							patient.`hypertension`, patient.`previous_pregnancies`, blood_type.`type_name`, medication.`medication_name`,\
							surgeries.`surgeries_name`, trimester.`trimester_name` FROM `patient`\
							JOIN `blood_type` ON patient.blood_type = blood_type.type_id\
							JOIN `medication` ON patient.medication_taken = medication.medication_id\
							JOIN `surgeries` ON patient.previous_surgeries = surgeries.surgeries_id\
							JOIN `trimester` ON patient.trimester = trimester.trimester_id\
							WHERE user_id=?";
              con.connection.query(
                sql,
                result.value.userId,
                function (error, rowsSpecific) {
                  if (rowsSpecific[0].previous_pregnancies) {
                    rowsSpecific[0].previous_pregnanciesValue =
                      "Had previous pregnancies";
                  } else {
                    rowsSpecific[0].previous_pregnanciesValue =
                      "No previous pregnancies";
                  }
                  if (rowsSpecific[0].diabetes) {
                    rowsSpecific[0].diabetesValue = "Diabetic";
                  } else {
                    rowsSpecific[0].diabetesValue = "Not Diabetic";
                  }
                  if (rowsSpecific[0].hypertension) {
                    rowsSpecific[0].hypertensionValue = "Hypertensive";
                  } else {
                    rowsSpecific[0].hypertensionValue = "Not Hypertensive";
                  }
                  rowsSpecific[0].birthDate = helper.fixDate(
                    rowsSpecific[0].birth_date
                  );
                  rowsSpecific[0].week = helper.getWeek(
                    rowsSpecific[0].first_pregnant_day
                  );
                  console.log(rowsSpecific[0].week);
                  rowsSpecific[0].first_pregnant_day = helper.fixDate(
                    rowsSpecific[0].first_pregnant_day
                  );
                  if (error) {
                    return res
                      .status(404)
                      .send({
                        message: "User Not Found. Login again.",
                        reason: error.message,
                      });
                  } else {
                    return res
                      .status(200)
                      .send({
                        userData: rows[0],
                        specificData: rowsSpecific[0],
                      });
                  }
                }
              );
            }
          } else {
            return res
              .status(401)
              .send({
                message: "You are not an authorized user.",
                reason: error,
              });
          }
        }
      });
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.post("/api/editcommon", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let userId = result.value.userId;
      let oldMail = req.body.oldMail;
      let firstName = req.body.fname;
      let lastName = req.body.lname;
      let email = req.body.email;
      let country = req.body.selectedCountry;
      let phoneNumber = req.body.phoneNb;
      if (
        userId &&
        oldMail &&
        firstName &&
        lastName &&
        email &&
        country &&
        phoneNumber
      ) {
        firstName = firstName.trim();
        lastName = lastName.trim();
        email = email.toLowerCase().trim();
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          return res.status(400).send({ message: "Invalid Email Format." });
        }
        if (!/^(03|70|71|76|78|79|81)\d{6}$/.test(phoneNumber)) {
          return res
            .status(400)
            .send({ message: "Invalid Phone Number Format." });
        }
        let check = false;
        if (oldMail == email) {
          check = true;
        }
        if (!check) {
          let sql = "SELECT email FROM `user` WHERE email =?";
          con.connection.query(sql, email, function (error, rows) {
            if (error) {
              return res
                .status(400)
                .send({
                  message: "Error updating your data. Try again later.",
                });
            } else {
              if (rows.length > 0) {
                return res
                  .status(400)
                  .send({
                    message:
                      "There is already an account for the chosen email.",
                  });
              } else {
                sql =
                  "UPDATE `user` SET first_name = ? , last_name = ?, email = ?, country = ?, phone_number =? WHERE id = ?";
                con.connection.query(
                  sql,
                  [firstName, lastName, email, country, phoneNumber, userId],
                  function (error, result) {
                    if (error) {
                      return res
                        .status(400)
                        .send({
                          message: "Error updating your data. Try again later.",
                        });
                    } else {
                      return res
                        .status(200)
                        .send({
                          message: "Your information was successfully updated.",
                        });
                    }
                  }
                );
              }
            }
          });
        } else {
          sql =
            "UPDATE `user` SET first_name = ? , last_name = ?, email = ?, country = ?, phone_number =? WHERE id = ?";
          con.connection.query(
            sql,
            [firstName, lastName, email, country, phoneNumber, userId],
            function (error, result) {
              console.log("test3");
              console.log(error);
              console.log(result);
              if (error) {
                return res
                  .status(400)
                  .send({
                    message: "Error updating your data. Try again later.",
                  });
              } else {
                return res
                  .status(200)
                  .send({
                    message: "Your information was successfully updated.",
                  });
              }
            }
          );
        }
      } else {
        return res.status(401).send({ message: "All Fields Are Required." });
      }
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.post("/api/editpatient", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let userId = result.value.userId;
      let birthDate = req.body.birthDate;
      let firstPregDay = req.body.firstPregnancyDay;
      let medication = req.body.selectedMedication;
      let diabetes = req.body.checkDiabetes;
      let hypertension = req.body.checkHypertension;
      let previousPregnancies = req.body.checkPrevPreg;
      let previousSurgeries = req.body.selectedSurgeries;
      let height = req.body.height;
      let sql = "SELECT pat_id FROM `patient` WHERE user_id=?";
      con.connection.query(sql, userId, function (error, rows) {
        if (error) {
          return res
            .status(401)
            .send({
              message: "There is an error editing updating your data.",
              reason: result.value,
            });
        } else {
          let patientId = rows[0].pat_id;
          if (
            patientId &&
            height &&
            birthDate &&
            firstPregDay &&
            medication != null &&
            diabetes != null &&
            hypertension != null &&
            previousPregnancies != null &&
            previousSurgeries != null
          ) {
            if (height <= 0) {
              return res.status(401).send({ message: "Null Height Value." });
            }
            if (height > 2.5) {
              return res
                .status(401)
                .send({
                  message:
                    "Height Value is in Meters. Fix your input accordingly.",
                });
            }
            let trimester = helper.getTrimester(firstPregDay);
            sql = "";
            if (diabetes == true || diabetes == "true") {
              diabetes = 1;
            } else {
              diabetes = 0;
            }
            if (hypertension == true || hypertension == "true") {
              hypertension = 1;
            } else {
              hypertension = 0;
            }
            if (previousPregnancies == true || previousPregnancies == "true") {
              previousPregnancies = 1;
            } else {
              previousPregnancies = 0;
            }
            sql =
              "UPDATE `patient` SET height = ?, birth_date=?, first_pregnant_day =?, trimester = ?, medication_taken = ?, diabetes = ?, hypertension = ?, previous_pregnancies = ?, previous_surgeries = ? WHERE pat_id = ?";
            con.connection.query(
              sql,
              [
                height,
                birthDate,
                firstPregDay,
                trimester,
                medication,
                diabetes,
                hypertension,
                previousPregnancies,
                previousSurgeries,
                patientId,
              ],
              async function (error, result) {
                if (error) {
                  console.log(error);
                  return res
                    .status(404)
                    .send({
                      message: "Error updating your data. Try again later.",
                    });
                } else {
                  return res
                    .status(200)
                    .send({
                      message: "Your information was successfully updated.",
                      userId: result.insertId,
                      result,
                    });
                }
              }
            );
          } else {
            return res
              .status(401)
              .send({ message: "All Fields Are Required." });
          }
        }
      });
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.post("/api/editdoctor", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let userId = result.value.userId;
      let speciality = req.body.speciality;
      let oopnum = req.body.oopnum;
      let gender = req.body.gender;
      let experience = req.body.experience;
      let biography = req.body.biography;
      speciality = speciality.trim();
      biography = biography.trim();
      let sql = "SELECT dr_id FROM `doctor` WHERE user_id=?";
      con.connection.query(sql, userId, function (error, rows) {
        if (error) {
          return res
            .status(401)
            .send({
              message: "There is an error updating your data.",
              reason: result.value,
            });
        } else {
          let doctorId = rows[0].dr_id;
          if (
            userId &&
            doctorId &&
            speciality &&
            oopnum &&
            gender &&
            experience
          ) {
            sql =
              "UPDATE `doctor` SET oop_number =?, speciality=?, gender=?, experience=?, biography=? WHERE dr_id = ?";
            con.connection.query(
              sql,
              [oopnum, speciality, gender, experience, biography, doctorId],
              async function (error, result) {
                if (error) {
                  console.log(error);
                  return res
                    .status(404)
                    .send({
                      message: "Error updating your data. Try again later.",
                    });
                } else {
                  return res
                    .status(200)
                    .send({
                      message: "Your information was successfully updated.",
                      userId: result.insertId,
                      result,
                    });
                }
              }
            );
          } else {
            return res
              .status(401)
              .send({ message: "All Fields Are Required." });
          }
        }
      });
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.post("/api/editlocation", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let location = req.body.locationId;
      let country = req.body.selectedCountry;
      let phoneNumber = req.body.phoneNumber;
      let floor = req.body.floor;
      let building = req.body.building;
      let street = req.body.street;
      let city = req.body.city;
      if (
        location &&
        country &&
        phoneNumber &&
        floor &&
        building &&
        street &&
        city
      ) {
        if (!/^(03|70|71|76|78|79|81)\d{6}$/.test(phoneNumber)) {
          return res
            .status(400)
            .send({ message: "Invalid Phone Number Format." });
        }
        let sql =
          "UPDATE `doctor_address` SET clinic_country=?, clinic_city=?, clinic_street=?,\
				clinic_building=?, clinic_floor=?, clinic_number=? WHERE clinic_id =?";
        con.connection.query(
          sql,
          [country, city, street, building, floor, phoneNumber, location],
          function (error, result) {
            if (error) {
              return res
                .status(401)
                .send({
                  message: "There is an error editing updating your data.",
                  reason: result.value,
                });
            } else {
              return res
                .status(200)
                .send({ message: "Location Edited successfully." });
            }
          }
        );
      } else {
        return res.status(401).send({ message: "All Fields Are Required." });
      }
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.post("/api/deletelocation", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let location = req.body.locationId;
      let sql = "DELETE FROM `doctor_address` WHERE clinic_id =?";
      con.connection.query(sql, location, function (error, result) {
        if (error) {
          return res
            .status(401)
            .send({
              message: "There is an error updating your data.",
              reason: result.value,
            });
        } else {
          if (result.affectedRows == 1) {
            return res
              .status(200)
              .send({ message: "Location Deleted successfully." });
          } else {
            return res
              .status(401)
              .send({
                message: "Your clinic does not exist.",
                reason: result.value,
              });
          }
        }
      });
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.post("/api/deleteuser", (req, res) => {
  let email = req.body.email;
  let sql = "SELECT `id`,`user_type` FROM user WHERE email = ?";
  con.connection.query(sql, email, function (error, rows) {
    if (error) {
      return res.status(404).send(error);
    } else {
      if (rows.length != 1) {
        return res.status(404).send("Invalid");
      } else {
        if (rows[0].user_type) {
          let sql = "SELECT `dr_id`, `user_id` FROM doctor WHERE user_id=?";
          con.connection.query(sql, rows[0].id, function (error, rows) {
            if (error) {
              return res.status(404).send(error);
            } else {
              if (rows.length < 1) {
                let sql = "DELETE FROM user WHERE email=?";
                con.connection.query(sql, email, function (error, result) {
                  console.log(error);
                  console.log(result);
                  return res
                    .status(200)
                    .send({ message: "Doctor Deleted Successfully" });
                });
              } else {
                let sql = "DELETE FROM confirmation_code WHERE user_id=?";
                con.connection.query(
                  sql,
                  rows[0].user_id,
                  function (error, result) {
                    if (error) {
                      console.log(error);
                    } else {
                      sql = "DELETE FROM doctor_address WHERE doctor_id=?";
                      con.connection.query(
                        sql,
                        rows[0].dr_id,
                        function (error, result) {
                          if (error) {
                            console.log(error);
                          } else {
                            sql = "DELETE FROM doctor WHERE dr_id=?";
                            con.connection.query(
                              sql,
                              rows[0].dr_id,
                              function (error, result) {
                                if (error) {
                                  console.log(error);
                                } else {
                                  sql = "DELETE FROM user WHERE id=?";
                                  con.connection.query(
                                    sql,
                                    rows[0].user_id,
                                    function (error, result) {
                                      if (error) {
                                        console.log(error);
                                      } else {
                                        return res
                                          .status(200)
                                          .send({
                                            message:
                                              "Doctor Deleted Successfully",
                                          });
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          });
        } else {
          let sql = "SELECT `pat_id`, `user_id` FROM patient WHERE user_id=?";
          con.connection.query(sql, rows[0].id, function (error, rows) {
            if (error) {
              return res.status(404).send(error);
            } else {
              if (rows.length < 1) {
                let sql = "DELETE FROM user WHERE email=?";
                con.connection.query(sql, email, function (error, result) {
                  console.log(error);
                  console.log(result);
                  return res
                    .status(200)
                    .send({ message: "Patient Deleted Successfully" });
                });
              } else {
                let sql = "DELETE FROM `fetal_measurements` WHERE patient_id=?";
                con.connection.query(
                  sql,
                  rows[0].pat_id,
                  function (error, result) {
                    if (error) {
                      console.log(error);
                    } else {
                      sql = "DELETE FROM `glucose` WHERE pat_id=?";
                      con.connection.query(
                        sql,
                        rows[0].pat_id,
                        function (error, result) {
                          if (error) {
                            console.log(error);
                          } else {
                            sql = "DELETE FROM `heart_rate` WHERE pat_id=?";
                            con.connection.query(
                              sql,
                              rows[0].pat_id,
                              function (error, result) {
                                if (error) {
                                  console.log(error);
                                } else {
                                  sql = "DELETE FROM `spo2` WHERE pat_id=?";
                                  con.connection.query(
                                    sql,
                                    rows[0].pat_id,
                                    function (error, result) {
                                      if (error) {
                                        console.log(error);
                                      } else {
                                        sql =
                                          "DELETE FROM `temperature` WHERE pat_id=?";
                                        con.connection.query(
                                          sql,
                                          rows[0].pat_id,
                                          function (error, result) {
                                            if (error) {
                                              console.log(error);
                                            } else {
                                              sql =
                                                "DELETE FROM confirmation_code WHERE user_id=?";
                                              con.connection.query(
                                                sql,
                                                rows[0].user_id,
                                                function (error, result) {
                                                  if (error) {
                                                    console.log(error);
                                                  } else {
                                                    sql =
                                                      "DELETE FROM `patient` WHERE pat_id=?";
                                                    con.connection.query(
                                                      sql,
                                                      rows[0].pat_id,
                                                      function (error, result) {
                                                        if (error) {
                                                          console.log(error);
                                                        } else {
                                                          sql =
                                                            "DELETE FROM `user` WHERE id=?";
                                                          con.connection.query(
                                                            sql,
                                                            rows[0].user_id,
                                                            function (
                                                              error,
                                                              result
                                                            ) {
                                                              if (error) {
                                                                console.log(
                                                                  error
                                                                );
                                                              } else {
                                                                return res
                                                                  .status(200)
                                                                  .send({
                                                                    message:
                                                                      "Patient Deleted Successfully",
                                                                  });
                                                              }
                                                            }
                                                          );
                                                        }
                                                      }
                                                    );
                                                  }
                                                }
                                              );
                                            }
                                          }
                                        );
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          });
        }
      }
    }
  });
});
app.post("/api/temperature", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let temperature = req.body.temperature;
      let checkValue = req.body.checked;
      if (temperature) {
        if (checkValue) {
          let sql = "SELECT * FROM `patient` WHERE user_id = ?";
          con.connection.query(
            sql,
            result.value.userId,
            function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({ message: "Your are not a user." });
              } else {
                if (rows.length != 1) {
                  return res
                    .status(404)
                    .send({ message: "Your are not a user." });
                } else {
                  if (temperature < values.temperature.low.high) {
                    return res.status(200).send({ message: "Hypothermia" });
                  } else if (temperature >= values.temperature.high.high.low) {
                    return res.status(200).send({ message: "High Fever" });
                  } else if (temperature >= values.temperature.high.light.low) {
                    return res.status(200).send({ message: "Light Fever" });
                  } else if (
                    rows[0].trimester == 1 ||
                    rows[0].trimester == 2 ||
                    rows[0].trimester == 3
                  ) {
                    return res.status(200).send({ message: "Normal Value" });
                  }
                }
              }
            }
          );
        } else {
          let sql = "SELECT pat_id FROM `patient` where user_id=?";
          con.connection.query(
            sql,
            result.value.userId,
            function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({
                    message: "There was an Error adding your body temperature.",
                  });
              } else {
                console.log(rows);
                console.log("=========");
                console.log(rows[0]);
                const today = new Date();
                const date = fixDate(today);
                const hours = today.getHours().toString().padStart(2, "0");
                const minutes = today.getMinutes().toString().padStart(2, "0");
                const seconds = today.getSeconds().toString().padStart(2, "0");
                let time = `${hours}:${minutes}:${seconds}`;
                sql =
                  "INSERT INTO `temperature` (pat_id, temp_val, temp_date, temp_time) VALUES(?,?,?,?)";
                con.connection.query(
                  sql,
                  [rows[0].pat_id, temperature, date, time],
                  function (error, result) {
                    if (error) {
                      return res
                        .status(404)
                        .send({
                          message:
                            "There was an Error adding your body temperature.",
                        });
                    } else {
                      return res
                        .status(200)
                        .send({ message: "Data successfully submited." });
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        return res
          .status(404)
          .send({ message: "Kindly input your body temperature" });
      }
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.post("/api/weight", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let weight = req.body.weight;
      let checkValue = req.body.checked;
      if (weight) {
        console.log("Test");
        if (checkValue) {
          let sql = "SELECT * FROM `patient` WHERE user_id = ?";
          con.connection.query(
            sql,
            result.value.userId,
            function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({ message: "Your are not a user." });
              } else {
                if (rows.length != 1) {
                  return res
                    .status(404)
                    .send({ message: "Your are not a user." });
                } else {
                  if (weight <= 0) {
                    return res
                      .status(200)
                      .send({ message: "Weight Cannot Be Null." });
                  }
                  let bmi = (
                    weight /
                    (rows[0].height * rows[0].height)
                  ).toFixed(2);
                  if (bmi < 18.5) {
                    return res
                      .status(200)
                      .send({
                        message: `You are Underweight, your BMI is: ${bmi}`,
                      });
                  } else if (bmi < 24.9) {
                    return res
                      .status(200)
                      .send({
                        message: `You have a Normal Weight, your BMI is: ${bmi}`,
                      });
                  } else if (bmi < 30) {
                    return res
                      .status(200)
                      .send({
                        message: `You are Overweight, your BMI is: ${bmi}`,
                      });
                  } else {
                    return res
                      .status(200)
                      .send({ message: `You are Obese, your BMI is: ${bmi}` });
                  }
                }
              }
            }
          );
        } else {
          let sql = "SELECT pat_id FROM `patient` where user_id=?";
          con.connection.query(
            sql,
            result.value.userId,
            function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({
                    message: "There was an Error adding your body weight.",
                  });
              } else {
                const today = new Date();
                const date = fixDate(today);
                const hours = today.getHours().toString().padStart(2, "0");
                const minutes = today.getMinutes().toString().padStart(2, "0");
                const seconds = today.getSeconds().toString().padStart(2, "0");
                let time = `${hours}:${minutes}:${seconds}`;
                sql =
                  "INSERT INTO `weight` (pat_id, weight_value, weight_date, weight_time) VALUES (?,?,?,?)";
                con.connection.query(
                  sql,
                  [rows[0].pat_id, weight, date, time],
                  function (error, result) {
                    if (error) {
                      return res
                        .status(404)
                        .send({
                          message:
                            "There was an Error adding your body weight.",
                        });
                    } else {
                      return res
                        .status(200)
                        .send({ message: "Data successfully submited." });
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        return res
          .status(404)
          .send({ message: "Kindly input your body weight" });
      }
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.post("/api/spo2", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let spo2 = req.body.spo2;
      let checkValue = req.body.checked;
      if (spo2) {
        if (checkValue) {
          let sql = "SELECT * FROM `patient` WHERE user_id = ?";
          con.connection.query(
            sql,
            result.value.userId,
            function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({ message: "Your are not a user." });
              } else {
                if (rows.length != 1) {
                  return res
                    .status(404)
                    .send({ message: "Your are not a user." });
                } else {
                  if (spo2 <= 0) {
                    return res
                      .status(200)
                      .send({ message: "SPO2 Cannot Be Null." });
                  }
                  if (rows[0].trimester == 1) {
                    if (spo2 < values.spo2.low.first) {
                      return res.status(200).send({ message: "Hypoxia." });
                    } else {
                      if (spo2 <= values.spo2.normal.first) {
                        return res
                          .status(200)
                          .send({ message: "Normal Value." });
                      } else {
                        return res.status(200).send({ message: "Hyperoxia." });
                      }
                    }
                  } else {
                    if (rows[0].trimester == 2) {
                      if (spo2 < values.spo2.low.second) {
                        return res.status(200).send({ message: "Hypoxia." });
                      } else {
                        if (spo2 <= values.spo2.normal.second) {
                          return res
                            .status(200)
                            .send({ message: "Normal Value." });
                        } else {
                          return res
                            .status(200)
                            .send({ message: "Hyperoxia." });
                        }
                      }
                    } else {
                      if (spo2 < values.spo2.low.second) {
                        return res.status(200).send({ message: "Hypoxia." });
                      } else {
                        if (spo2 <= values.spo2.normal.second) {
                          return res
                            .status(200)
                            .send({ message: "Normal Value." });
                        } else {
                          return res
                            .status(200)
                            .send({ message: "Hyperoxia." });
                        }
                      }
                    }
                  }
                }
              }
            }
          );
        } else {
          let sql = "SELECT pat_id FROM `patient` where user_id=?";
          con.connection.query(
            sql,
            result.value.userId,
            function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({
                    message: "There was an Error adding your SPO2 values.",
                  });
              } else {
                const today = new Date();
                const date = fixDate(today);
                const hours = today.getHours().toString().padStart(2, "0");
                const minutes = today.getMinutes().toString().padStart(2, "0");
                const seconds = today.getSeconds().toString().padStart(2, "0");
                let time = `${hours}:${minutes}:${seconds}`;
                sql =
                  "INSERT INTO `spo2` (pat_id, spo2_val, spo2_date, spo2_time) VALUES (?,?,?,?)";
                con.connection.query(
                  sql,
                  [rows[0].pat_id, spo2, date, time],
                  function (error, result) {
                    if (error) {
                      return res
                        .status(404)
                        .send({
                          message:
                            "There was an Error adding your SPO2 values.",
                        });
                    } else {
                      return res
                        .status(200)
                        .send({ message: "Data successfully submited." });
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        return res
          .status(404)
          .send({ message: "Kindly input your SPO2 values." });
      }
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.post("/api/glucose", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let glucose = req.body.glucose;
      let checkValue = req.body.checked;
      let timeOfDay = req.body.checkedTime;
      if (glucose) {
        if (checkValue) {
          if (glucose <= 0) {
            return res.status(200).send({ message: "Glucose Cannot Be Null." });
          }
          if (timeOfDay == 1) {
            if (glucose < values.glucose.before.low) {
              return res
                .status(200)
                .send({ message: "Glucose Status: Hypoglycemia.s" });
            } else {
              if (glucose < values.glucose.before.high) {
                return res
                  .status(200)
                  .send({ message: "Glucose Status: Normal." });
              } else {
                return res
                  .status(200)
                  .send({ message: "Glucose Status: Hyperglycemia." });
              }
            }
          } else {
            if (timeOfDay == 2) {
              if (glucose < values.glucose.after1.low) {
                return res
                  .status(200)
                  .send({ message: "Glucose Status: Hypoglycemia.s" });
              } else {
                if (glucose < values.glucose.after1.high) {
                  return res
                    .status(200)
                    .send({ message: "Glucose Status: Normal." });
                } else {
                  return res
                    .status(200)
                    .send({ message: "Glucose Status: Hyperglycemia." });
                }
              }
            } else {
              if (timeOfDay == 3) {
                if (glucose < values.glucose.after2.low) {
                  return res
                    .status(200)
                    .send({ message: "Glucose Status: Hypoglycemia.s" });
                } else {
                  if (glucose < values.glucose.after2.high) {
                    return res
                      .status(200)
                      .send({ message: "Glucose Status: Normal." });
                  } else {
                    return res
                      .status(200)
                      .send({ message: "Glucose Status: Hyperglycemia." });
                  }
                }
              }
            }
          }
        } else {
          let sql = "SELECT pat_id FROM `patient` where user_id=?";
          con.connection.query(
            sql,
            result.value.userId,
            function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({
                    message: "There was an Error adding your glucose values.",
                  });
              } else {
                const today = new Date();
                const date = fixDate(today);
                const hours = today.getHours().toString().padStart(2, "0");
                const minutes = today.getMinutes().toString().padStart(2, "0");
                const seconds = today.getSeconds().toString().padStart(2, "0");
                let time = `${hours}:${minutes}:${seconds}`;
                sql =
                  "INSERT INTO `glucose` (pat_id, glucose_val, gluc_date, gluc_time) VALUES (?,?,?,?)";
                con.connection.query(
                  sql,
                  [rows[0].pat_id, glucose, date, time],
                  function (error, result) {
                    if (error) {
                      return res
                        .status(404)
                        .send({
                          message:
                            "There was an Error adding your glucose values.",
                        });
                    } else {
                      return res
                        .status(200)
                        .send({ message: "Data successfully submited." });
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        return res
          .status(404)
          .send({ message: "Kindly input your glucose values." });
      }
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.post("/api/heartrate", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let pulse = req.body.pulse;
      let systolic = req.body.systolic;
      let diastolic = req.body.diastolic;
      let checkValue = req.body.checked;
      if ((pulse, systolic, diastolic)) {
        if (checkValue) {
          let respStatus = "";
          let systStatus = "";
          let sql = "SELECT * FROM `patient` WHERE user_id = ?";
          con.connection.query(
            sql,
            result.value.userId,
            function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({ message: "Your are not a user." });
              } else {
                if (rows.length != 1) {
                  return res
                    .status(404)
                    .send({ message: "Your are not a user." });
                } else {
                  if (pulse <= 0 || diastolic <= 0 || systolic <= 0) {
                    return res
                      .status(200)
                      .send({ message: "Input Cannot Be Null." });
                  }
                  if (rows[0].trimester == 1) {
                    if (pulse < values.heartrate.low.first) {
                      respStatus = "Respiratory status: Bradycardia.";
                    } else {
                      if (pulse <= values.heartrate.normal.first) {
                        respStatus = "Respiratory status: Normal.";
                      } else {
                        respStatus = "Respiratory status: Tachycardia.";
                      }
                    }
                    if (
                      systolic < values.systolic.low.first ||
                      diastolic < values.diastolic.low.first
                    ) {
                      systStatus = "Blood Pressure: Hypotension.";
                    } else {
                      if (
                        systolic <= values.systolic.normal.first ||
                        diastolic <= values.diastolic.normal.first
                      ) {
                        systStatus = "Blood Pressure: Normal.";
                        if (systolic >= 120 && systolic < 130) {
                          systStatus = "Blood Pressure: Pre-Hypertension.";
                        } else if (
                          systolic >= 130 ||
                          (diastolic >= 80 && diastolic <= 89)
                        ) {
                          systStatus = "Blood Pressure: Stage 1 Hypertension.";
                        }
                      } else {
                        if (
                          (systolic >= 140 && systolic < 180) ||
                          (diastolic >= 90 && diastolic < 110)
                        ) {
                          systStatus = "Blood Pressure: Stage 2 Hypertension.";
                        } else {
                          systStatus = "Blood Pressure: Hypertensive Crisis.";
                        }
                      }
                    }
                    return res
                      .status(200)
                      .send({
                        respiratoryStatus: respStatus,
                        bloodPressure: systStatus,
                      });
                  } else {
                    if (rows[0].trimester == 2) {
                      if (pulse < values.heartrate.low.second) {
                        respStatus = "Respiratory status: Bradycardia.";
                      } else {
                        if (pulse <= values.heartrate.normal.second) {
                          respStatus = "Respiratory status: Normal.";
                        } else {
                          respStatus = "Respiratory status: Tachycardia.";
                        }
                      }
                      if (
                        systolic < values.systolic.low.second ||
                        diastolic < values.diastolic.low.second
                      ) {
                        systStatus = "Blood Pressure: Hypotension.";
                      } else {
                        if (
                          systolic <= values.systolic.normal.second ||
                          diastolic <= values.diastolic.normal.second
                        ) {
                          systStatus = "Blood Pressure: Normal.";
                          if (systolic >= 120 && systolic < 130) {
                            systStatus = "Blood Pressure: Pre-Hypertension.";
                          } else if (
                            systolic >= 130 ||
                            (diastolic >= 80 && diastolic <= 89)
                          ) {
                            systStatus =
                              "Blood Pressure: Stage 1 Hypertension.";
                          }
                        } else {
                          if (
                            (systolic >= 140 && systolic < 180) ||
                            (diastolic >= 90 && diastolic < 110)
                          ) {
                            systStatus =
                              "Blood Pressure: Stage 2 Hypertension.";
                          } else {
                            systStatus = "Blood Pressure: Hypertensive Crisis.";
                          }
                        }
                      }
                      return res
                        .status(200)
                        .send({
                          respiratoryStatus: respStatus,
                          bloodPressure: systStatus,
                        });
                    } else {
                      if (pulse < values.heartrate.low.third) {
                        respStatus = "Respiratory status: Bradycardia.";
                      } else {
                        if (pulse <= values.heartrate.normal.third) {
                          respStatus = "Respiratory status: Normal.";
                        } else {
                          respStatus = "Respiratory status: Tachycardia.";
                        }
                      }
                      if (
                        systolic < values.systolic.low.third ||
                        diastolic < values.diastolic.low.third
                      ) {
                        systStatus = "Blood Pressure: Hypotension.";
                      } else {
                        if (
                          systolic <= values.systolic.normal.third ||
                          diastolic <= values.diastolic.normal.third
                        ) {
                          systStatus = "Blood Pressure: Normal.";
                          if (systolic >= 120 && systolic < 130) {
                            systStatus = "Blood Pressure: Pre-Hypertension.";
                          } else if (
                            systolic >= 130 ||
                            (diastolic >= 80 && diastolic <= 89)
                          ) {
                            systStatus =
                              "Blood Pressure: Stage 1 Hypertension.";
                          }
                        } else {
                          if (
                            (systolic >= 140 && systolic < 180) ||
                            (diastolic >= 90 && diastolic < 110)
                          ) {
                            systStatus =
                              "Blood Pressure: Stage 2 Hypertension.";
                          } else {
                            systStatus = "Blood Pressure: Hypertensive Crisis.";
                          }
                        }
                      }
                      return res
                        .status(200)
                        .send({
                          respiratoryStatus: respStatus,
                          bloodPressure: systStatus,
                        });
                    }
                  }
                }
              }
            }
          );
        } else {
          let sql = "SELECT pat_id FROM `patient` where user_id=?";
          con.connection.query(
            sql,
            result.value.userId,
            function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({
                    message:
                      "There was an Error adding your Heart Rate values.",
                  });
              } else {
                const today = new Date();
                const date = fixDate(today);
                const hours = today.getHours().toString().padStart(2, "0");
                const minutes = today.getMinutes().toString().padStart(2, "0");
                const seconds = today.getSeconds().toString().padStart(2, "0");
                let time = `${hours}:${minutes}:${seconds}`;
                sql =
                  "INSERT INTO `heart_rate` (pat_id, HR_val, Sys_val, Dias_val, hr_date, hr_time) VALUES (?,?,?,?,?,?)";
                con.connection.query(
                  sql,
                  [rows[0].pat_id, pulse, systolic, diastolic, date, time],
                  function (error, result) {
                    if (error) {
                      return res
                        .status(404)
                        .send({
                          message:
                            "There was an Error adding your Heart Rate values.",
                        });
                    } else {
                      return res
                        .status(200)
                        .send({ message: "Data successfully submited." });
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        return res
          .status(404)
          .send({ message: "Kindly input your Heart Rate values." });
      }
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
// -------------------------Functionalities------------------------------- //

// -------------------------Access Patient Measurements------------------------------- //
app.get("/api/temperaturevalue", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let sql = "SELECT pat_id FROM `patient` where user_id=?";
      con.connection.query(sql, result.value.userId, function (error, rows) {
        if (error) {
          return res
            .status(404)
            .send({ message: "You are not a valid patient." });
        } else {
          if (rows.length == 1) {
            sql =
              "SELECT temp_id, temp_val, temp_date, temp_time FROM `temperature` where pat_id=? ORDER BY temp_id ASC";
            con.connection.query(sql, rows[0].pat_id, function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({
                    message:
                      "There was an Error fetching your body temperature.",
                  });
              } else {
                rows.forEach((element) => {
                  element.temp_date = helper.fixDate(element.temp_date);
                });
                return res.status(200).send({ data: rows });
              }
            });
          } else {
            return res
              .status(401)
              .send({ message: "You are not an authorized user." });
          }
        }
      });
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.get("/api/weightvalue", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let sql = "SELECT pat_id FROM `patient` where user_id=?";
      con.connection.query(sql, result.value.userId, function (error, rows) {
        if (error) {
          return res
            .status(404)
            .send({ message: "You are not a valid patient." });
        } else {
          if (rows.length == 1) {
            sql =
              "SELECT weight_id, weight_value, weight_date, weight_time FROM `weight` where pat_id=? ORDER BY weight_id ASC";
            con.connection.query(sql, rows[0].pat_id, function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({
                    message: "There was an Error fetching your weight.",
                  });
              } else {
                rows.forEach((element) => {
                  element.weight_date = helper.fixDate(element.weight_date);
                });
                return res.status(200).send({ data: rows });
              }
            });
          } else {
            return res
              .status(401)
              .send({ message: "You are not an authorized user." });
          }
        }
      });
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.get("/api/spo2value", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let sql = "SELECT pat_id FROM `patient` where user_id=?";
      con.connection.query(sql, result.value.userId, function (error, rows) {
        if (error) {
          return res
            .status(404)
            .send({ message: "You are not a valid patient." });
        } else {
          if (rows.length == 1) {
            sql =
              "SELECT spo2_id, spo2_val, spo2_date, spo2_time FROM `spo2` where pat_id=? ORDER BY spo2_id ASC";
            con.connection.query(sql, rows[0].pat_id, function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({
                    message: "There was an Error fetching your SPO2 Values.",
                  });
              } else {
                rows.forEach((element) => {
                  element.spo2_date = helper.fixDate(element.spo2_date);
                });
                return res.status(200).send({ data: rows });
              }
            });
          } else {
            return res
              .status(401)
              .send({ message: "You are not an authorized user." });
          }
        }
      });
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.get("/api/glucosevalue", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let sql = "SELECT pat_id FROM `patient` where user_id=?";
      con.connection.query(sql, result.value.userId, function (error, rows) {
        if (error) {
          return res
            .status(404)
            .send({ message: "You are not a valid patient." });
        } else {
          if (rows.length == 1) {
            sql =
              "SELECT glucose_id, glucose_val, gluc_date, gluc_time FROM `glucose` where pat_id=? ORDER BY glucose_id ASC";
            con.connection.query(sql, rows[0].pat_id, function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({
                    message: "There was an Error fetching your Glucose values.",
                  });
              } else {
                rows.forEach((element) => {
                  element.gluc_date = helper.fixDate(element.gluc_date);
                });
                return res.status(200).send({ data: rows });
              }
            });
          } else {
            return res
              .status(401)
              .send({ message: "You are not an authorized user." });
          }
        }
      });
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
app.get("/api/heartratevalue", (req, res) => {
  (async () => {
    const token = req.headers.authorization.split(" ")[1];
    let result = await helper.validateUser(token);
    if (result.indicator) {
      let sql = "SELECT pat_id FROM `patient` where user_id=?";
      con.connection.query(sql, result.value.userId, function (error, rows) {
        if (error) {
          return res
            .status(404)
            .send({ message: "You are not a valid patient." });
        } else {
          if (rows.length == 1) {
            sql =
              "SELECT hr_id, HR_val, Sys_val, Dias_val, hr_date, hr_time FROM `heart_rate` where pat_id=? ORDER BY hr_id ASC";
            con.connection.query(sql, rows[0].pat_id, function (error, rows) {
              if (error) {
                return res
                  .status(404)
                  .send({
                    message: "There was an Error fetching your heart rate.",
                  });
              } else {
                rows.forEach((element) => {
                  element.hr_date = helper.fixDate(element.hr_date);
                });
                return res.status(200).send({ data: rows });
              }
            });
          } else {
            return res
              .status(401)
              .send({ message: "You are not an authorized user." });
          }
        }
      });
    } else {
      return res
        .status(401)
        .send({
          message: "You are not an authorized user.",
          reason: result.value,
        });
    }
  })();
});
// -------------------------Access Patient Measurements------------------------------- //

//countries.getDataUsingAsyncAwaitGetCall(); //Do not remove the comment unless you want to fill the countries tables again.
timer.cleanVerification(); //cleans the database from verification codes that have been there for more than 10 minutes
timer.updateTrimester(); //Runs at midnight to update the trimester of every patient that needs updating.

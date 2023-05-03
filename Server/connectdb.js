var mysql = require('mysql');
const connection = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.DB_PASS,
	database : "heroku_e89ea0ca17612a0", 
	connectionLimit: 999,
	waitForConnections: true
})

// Connecting to database
connection.query(`SHOW DATABASES`, function (err, result) {
	if(err)
		console.log(`Error executing the query - ${err}`)
	else
		console.log("Result: ",result)
	});

exports.connection = connection;
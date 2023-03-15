var mysql = require('mysql');
const connection = mysql.createConnection({
	host:"eu-cdbr-west-03.cleardb.net",
	user:"b7deccfcfa1709",
	password:"bb7ff2a9",
	database : "heroku_e89ea0ca17612a0", 
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
exports.connection = connection;
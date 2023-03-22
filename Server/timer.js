const con = require('./connectdb.js');
function cleanVerification() {
    let sql = "SELECT `created_on` from `confirmation_code`";
    con.connection.query(sql, function(error, result){

    });
    console.log("This function will run every 10 minutes.");
}
  
setInterval(cleanVerification, 10 * 60 * 1000);

exports.cleanVerification = cleanVerification;

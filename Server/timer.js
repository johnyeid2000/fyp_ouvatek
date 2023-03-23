const con = require('./connectdb.js');
function cleanVerification() {
    // let sql = "SELECT `created_on` from `confirmation_code` ORDER BY `created_on` DESC";
    // con.connection.query(sql, function(error, rows, fields){
    //     if(error){
    //         return res.status(404).send({ message: 'Cleaning Not found or Failed.' });
    //     }else{
    //         if(rows.length < 1){
    //             return res.status(200).send({ message: 'Nothing to Clean.'});
    //         }else{
    //             const currentDate = new Date();
    //             rows.forEach((stamp, index) => {
    //                 console.log(currentDate, stamp.created_on)
    //                 let timediff = Math.abs(currentDate - stamp.created_on);
    //                 console.log(timediff);
    //                 if(currentDate - stamp.created_on > 10* 60 * 1000){
    //                     console.log(index);
    //                 }

    //             });
    //         }

    //     }
    // });
    console.log("This function will run every 10 minutes.");
}
  
setInterval(cleanVerification, 60 * 1000);

exports.cleanVerification = cleanVerification;

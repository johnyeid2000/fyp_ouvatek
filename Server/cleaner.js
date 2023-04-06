const con = require('./connectdb.js');
const helper = require('./helper.js');
cleanVerification = () =>{
    let sql = "SELECT * from `confirmation_code` ORDER BY `created_on` DESC";
    con.connection.query(sql, function(error, rows, fields){
        if(error){
            console.log("Error Cleaning", error);
        }else{
            if(rows.length < 1){
                console.log("Nothing to Clean :)");
            }else{
                rows.forEach(stamp => {
                    const currentDate = new Date();
                    if(Math.abs(currentDate - stamp.created_on) > 10* 60 * 1000){
                        let sql = "DELETE FROM `confirmation_code` WHERE user_id = ?"
					    con.connection.query(sql, stamp.user_id, async function(error, result){
                            if(error){
                                console.log("Error Cleaning", error);
                            }
					    });
                    }
                });
            }
        }
    });
}
setInterval(cleanVerification, 60 * 1000 * 10);
updateTrimester = () =>{
    // Convert the date string to a Date object
    let sql = 'SELECT * FROM `patient`'
    con.connection.query(sql, function(error, rows){
        if(error){
            return error.message;
        }else{
            rows.forEach((row) => {
                let trimester = helper.getTrimester(row.birth_date);
                if(trimester != row[0].trimester){
                    let sql = 'UPDATE table `patient` SET `trimester`= ? WHERE pat_id= ?'
                    con.connection.query(sql, [trimester, row.pat_id], function(error, result){
                        if(error){
                            return error.message;
                        }
                    });
                }
            });
            console.log("Trimesters Updated!") ;
            return "Success";
        }
    });
}
setInterval(updateTrimester, 60 * 1000 * 60 * 24);

exports.cleanVerification = cleanVerification;
exports.updateTrimester = updateTrimester;

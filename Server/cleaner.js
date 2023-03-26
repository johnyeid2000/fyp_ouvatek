const con = require('./connectdb.js');
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
exports.cleanVerification = cleanVerification;

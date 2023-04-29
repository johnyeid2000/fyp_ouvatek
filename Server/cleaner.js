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
    con.connection.query(sql, async function(error, rows){
        if(error){
            return error.message;
        }else{
            if(rows.length < 1){
                console.log("Trimesters Updated!");
            }else{
                let candidant = [];
                rows.forEach(async (row,index) => {
                    let date = row.first_pregnant_day;
                    let trimester = await helper.getTrimester(date);
                    candidant.push(trimester);
                    if(candidant[index]!=row.trimester){
                        let sql = 'UPDATE `patient` SET trimester= ? WHERE pat_id= ?'
                        con.connection.query(sql, [candidant[index], row.pat_id], function(error, result){
                            if(error){
                                console.log(error.message);
                                console.log(result);
                            }
                            else{
                                console.log("Trimesters Fixed: ", result.affectedRows)
                            }
                        });
                    }
                });
            }
            return "Success";
        }
    });
}
setInterval(updateTrimester, 60 * 1000 * 60 * 24);
clearUsers = () =>{
    // Convert the date string to a Date object
    let sql = 'SELECT id, user_type, created_on FROM `user` WHERE valid = 0'
    con.connection.query(sql, async function(error, rows){
        if(error){
            return error.message;
        }else{
            if(rows.length < 1){
                console.log("All Users Are Valid!");
            }else{
                rows.forEach(async (row) => {
                    const currentDate = new Date();
                    if(Math.abs(currentDate.getTime() - row.created_on.getTime()) > 30* 60 * 1000){
                        if(row.user_type == 0){
                            let sql = "DELETE FROM `patient` WHERE user_id = ?";
                            con.connection.query(sql, row.id, function(error, result){
                                console.log(result);
                                let sql = 'DELETE FROM `user` WHERE id= ?'
                                con.connection.query(sql, row.id, function(error, result){
                                    if(error){
                                        console.log(error.message);
                                        console.log(result);
                                    }
                                    else{
                                        console.log("User Deleted: ", result.affectedRows)
                                    }
                                });
                            });
                        }
                        else{
                            let sql = "SELECT dr_id FROM `doctor` WHERE user_id = ?";
                            con.connection.query(sql, row.id, function(error, docrow){
                                if(error){
                                    console.log(error.message);
                                    console.log(result);
                                }
                                else{
                                    if(docrow.length !=0){
                                        let sql = "DELETE FROM `doctor_address` WHERE doctor_id = ?";
                                        con.connection.query(sql, docrow[0].dr_id, function(error, result){
                                            if(error){
                                                console.log(error.message);
                                                console.log(result);
                                            }
                                            else{
                                                let sql = "DELETE FROM `doctor` WHERE user_id = ?";
                                                con.connection.query(sql, row.id, function(error, result){
                                                    if(error){
                                                        console.log(error.message);
                                                        console.log(result);
                                                    }
                                                    else{
                                                        let sql = 'DELETE FROM `user` WHERE id= ?'
                                                        con.connection.query(sql, row.id, function(error, result){
                                                            if(error){
                                                                console.log(error.message);
                                                                console.log(result);
                                                            }
                                                            else{
                                                                console.log("User Deleted: ", result.affectedRows)
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else{
                                        let sql = 'DELETE FROM `user` WHERE id= ?'
                                        con.connection.query(sql, row.id, function(error, result){
                                            if(error){
                                                console.log(error.message);
                                                console.log(result);
                                            }
                                            else{
                                                console.log("User Deleted: ", result.affectedRows)
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
                return "Success";
            }
        }
    });
}
setInterval(clearUsers, 60 * 1000 * 30);

exports.clearUsers = clearUsers;
exports.cleanVerification = cleanVerification;
exports.updateTrimester = updateTrimester;

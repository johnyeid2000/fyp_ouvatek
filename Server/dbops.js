const con = require('./connectdb.js');

function getCountryName(id){
    let sql = 'SELECT * FROM `country` WHERE country_id=?';
    con.connection.query(sql, id, function(error, rows){
        if(error){
            return error.message;
        }else{
            return rows[0].country_name;
        }
    });
}
function getBloodTypeName(id){
    let sql = 'SELECT * FROM `blood_type` WHERE type_id=?';
    con.connection.query(sql, id, function(error, rows){
        if(error){
            return error.message;
        }else{
            return rows[0].type_name;
        }
    });
}
function getExperienceYears(id){
    let sql = 'SELECT * FROM `experience` WHERE exp_id=?';
    con.connection.query(sql, id, function(error, rows){
        if(error){
            return error.message;
        }else{
            return rows[0].exp_years;
        }
    });
}
function getMedicationName(id){
    let sql = 'SELECT * FROM `medication` WHERE medication_id=?';
    con.connection.query(sql, id, function(error, rows){
        if(error){
            return error.message;
        }else{
            return rows[0].medication_name;
        }
    });
}
function getTrimesterName(id){
    let sql = 'SELECT * FROM `trimester` WHERE trimester_id=?';
    con.connection.query(sql, id, function(error, rows){
        if(error){
            return error.message;
        }else{
            return rows[0].trimester_name;
        }
    });
}
function getSurgeryName(id){
    let sql = 'SELECT * FROM `surgeries` WHERE surgeries_id=?';
    con.connection.query(sql, id, function(error, rows){
        if(error){
            return error.message;
        }else{
            return rows[0].surgeries_name;
        }
    });
}

exports.getCountryName = getCountryName;
exports.getBloodTypeName = getBloodTypeName;
exports.getExperienceYears = getExperienceYears;
exports.getMedicationName = getMedicationName;
exports.getTrimesterName = getTrimesterName;
exports.getSurgeryName = getSurgeryName;

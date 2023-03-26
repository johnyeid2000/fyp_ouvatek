const jwt = require('jsonwebtoken');

async function validateUser(token){
    let result ={
        indicator: false,
        value: ""
    }
    try{
        result.value = await jwt.verify(token, process.env.SECRET);
        result.indicator = true;
        return result;
    }
    catch(error){
        result.indicator = false;
        result.value = error.message;
        return result;
    }
}

exports.validateUser = validateUser;

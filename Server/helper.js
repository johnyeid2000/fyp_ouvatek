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
function getWeek(oldDate){
    const date = new Date(oldDate);
    const timeDiff = new Date() - date;
    const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    return weeksDiff;
}
function getTrimester(oldDate) {
    // Convert the date string to a Date object
    const date = new Date(oldDate);
  
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the dates 3, 6, and 9 months ago
    const threeMonthsAgo = new Date(currentDate.getTime() - (90 * 24 * 60 * 60 * 1000));
    const sixMonthsAgo = new Date(currentDate.getTime() - (180 * 24 * 60 * 60 * 1000));
    const nineMonthsAgo = new Date(currentDate.getTime() - (270 * 24 * 60 * 60 * 1000));
    let result = "null";
    // Check which range the date falls into
    if (date < nineMonthsAgo) {
        return result;
    } else if (date < sixMonthsAgo) {
        result = 3;
        return result;
    } else if (date < threeMonthsAgo) {
        result = 2;
        return result;
    } else {
        result = 1;
        return result;
    }
}

exports.validateUser = validateUser;
exports.getWeek = getWeek;
exports.getTrimester = getTrimester;


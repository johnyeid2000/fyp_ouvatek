const jwt = require('jsonwebtoken');
const con = require('./connectdb.js');
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
function getWeek(edd){
    var today = new Date();
    // Get the current year, month, and day
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // Adding 1 because month is zero-based
    var day = today.getDate();

    // Format the current date as yyyy-mm-dd
    var formattedDate = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
    var date1 = formattedDate;
    var date2 =  edd;

    // Split the dates into year, month, and day components
    var parts1 = date1.split('-');
    var year1 = parseInt(parts1[0], 10);
    var month1 = parseInt(parts1[1], 10);
    var day1 = parseInt(parts1[2], 10);

    var parts2 = date2.split('-');
    var year2 = parseInt(parts2[0], 10);
    var month2 = parseInt(parts2[1], 10);
    var day2 = parseInt(parts2[2], 10);

    // Create Date objects with the given dates
    var dateObject1 = new Date(year1, month1 - 1, day1);
    var dateObject2 = new Date(year2, month2 - 1, day2);

    // Calculate the time difference in milliseconds
    var timeDiff = Math.abs(dateObject2.getTime() - dateObject1.getTime());

    // Convert the time difference from milliseconds to days
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(daysDiff);
    let weekDiff = Math.ceil((280 - daysDiff)/ 7);
    return weekDiff;
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
        result = 3;
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
function fixDate(givenDate){
    let year = givenDate.getFullYear();
    let month = ("0" + (givenDate.getMonth() + 1)).slice(-2); // Adding 1 since January is 0
    let day = ("0" + givenDate.getDate()).slice(-2); // Adding leading zero if needed

    let formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
}
function getFirstTime(givenTime){
    let dateStr = givenTime;
    let [hours, minutes] = dateStr.split(':');
    let newDateStr = `${hours}:${minutes}`;
    let [hours2, minutes2] = newDateStr.split(':');
    minutes2 = parseInt(minutes2, 10) + 30;
    let newTimeStr = `${hours2}:${minutes2.toString().padStart(2, '0')}`;
    let value = `${newDateStr}-${newTimeStr}`;
    return value;
}
function getLastTime(givenTime){
    let dateStr = givenTime;
    let [hours, minutes] = dateStr.split(':');
    let newDateStr = `${hours}:${minutes}`;
    let [hours2, minutes2] = newDateStr.split(':');
    minutes2 = parseInt(minutes2, 10) - 30;
    if (minutes2 < 0) {
        minutes2 = 60 + minutes2;
        hours2 = parseInt(hours2, 10) - 1;
        if (hours2 < 0) {
          hours2 = 23;
        }
      }
    let newTimeStr = `${hours2}:${minutes2.toString().padStart(2, '0')}`;
    let value = `${newTimeStr}-${newDateStr}`;
    return value;
}
function fixTime(oldTime){
    const timeWithoutSeconds = oldTime.substring(0, 5);
    return timeWithoutSeconds;
}
function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[date.getDay()];
}
function getEDD(oldDate, previous){
    var givenDate = oldDate;

    // Split the date into year, month, and day components
    var parts = givenDate.split('-');
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var day = parseInt(parts[2], 10);

    // Create a new Date object with the given date
    var dateObject = new Date(year, month - 1, day);

    // Increment the date by 1 year
    dateObject.setFullYear(dateObject.getFullYear() + 1);

    // Get the updated year, month, and day
    var updatedYear = dateObject.getFullYear();
    var updatedMonth = dateObject.getMonth() + 1; // Adding 1 because month is zero-based
    var updatedDay = dateObject.getDate();

    // Format the updated date as yyyy-mm-dd
    var updatedDate = updatedYear + '-' + ('0' + updatedMonth).slice(-2) + '-' + ('0' + updatedDay).slice(-2);
    var parts = updatedDate.split('-');
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var day = parseInt(parts[2], 10);

    // Create a new Date object with the updated date
    var dateObject = new Date(year, month - 1, day);

    // Remove two months from the date
    dateObject.setMonth(dateObject.getMonth() - 2);

    // Get the updated year, month, and day
    var updatedYear = dateObject.getFullYear();
    var updatedMonth = dateObject.getMonth() + 1; // Adding 1 because month is zero-based
    var updatedDay = dateObject.getDate();

    // Format the updated date as yyyy-mm-dd
    var finalDate = updatedYear + '-' + ('0' + updatedMonth).slice(-2) + '-' + ('0' + updatedDay).slice(-2);
    if(previous){
        console.log("Had Previous: " , previous);
        var parts = finalDate.split('-');
        var year = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var day = parseInt(parts[2], 10);
    
        // Create a new Date object with the final date
        var dateObject = new Date(year, month - 1, day);
    
        // Remove 14 days from the date
        dateObject.setDate(dateObject.getDate() - 14);
    
        // Get the updated year, month, and day
        var updatedYear = dateObject.getFullYear();
        var updatedMonth = dateObject.getMonth() + 1; // Adding 1 because month is zero-based
        var updatedDay = dateObject.getDate();
    
        // Format the updated date as yyyy-mm-dd
        var updatedDate = updatedYear + '-' + ('0' + updatedMonth).slice(-2) + '-' + ('0' + updatedDay).slice(-2);
    }
    else{
        console.log("No Previous: " , previous);
        var parts = finalDate.split('-');
        var year = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var day = parseInt(parts[2], 10);
    
        // Create a new Date object with the final date
        var dateObject = new Date(year, month - 1, day);
    
        // Remove 14 days from the date
        dateObject.setDate(dateObject.getDate() - 18);
    
        // Get the updated year, month, and day
        var updatedYear = dateObject.getFullYear();
        var updatedMonth = dateObject.getMonth() + 1; // Adding 1 because month is zero-based
        var updatedDay = dateObject.getDate();
    
        // Format the updated date as yyyy-mm-dd
        var updatedDate = updatedYear + '-' + ('0' + updatedMonth).slice(-2) + '-' + ('0' + updatedDay).slice(-2);
    }
    return updatedDate;
}
exports.getEDD = getEDD;
exports.getDayOfWeek = getDayOfWeek;
exports.getFirstTime = getFirstTime;
exports.getLastTime = getLastTime;
exports.validateUser = validateUser;
exports.getWeek = getWeek;
exports.getTrimester = getTrimester;
exports.fixDate = fixDate;
exports.fixTime = fixTime;


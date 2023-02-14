const bcrypt = require('bcrypt');
const saltRounds = 10;
// Store the hashed password in the database
function hashPassword(password) {
    bcrypt.genSalt(saltRounds, function(error, salt){
        bcrypt.hash(password, salt, function(error, hash){
            return hash
        });
    });
}
async function comparePassword(password, storedHash) {
    let result = await bcrypt.compare(password, storedHash);
    return result;
}


exports.comparePassword = comparePassword;
exports.hashPassword = hashPassword;
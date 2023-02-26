const bcrypt = require('bcrypt');
const saltRounds = 10;
// Store the hashed password in the database
async function hashPassword(plainTextPassword) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);
    return hash;
  }
async function comparePassword(password, storedHash) {
    let result = await bcrypt.compare(password, storedHash);
    return result;
}


exports.comparePassword = comparePassword;
exports.hashPassword = hashPassword;
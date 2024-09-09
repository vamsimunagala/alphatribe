
const jwt = require('jsonwebtoken');
const generateToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
module.exports = generateToken;

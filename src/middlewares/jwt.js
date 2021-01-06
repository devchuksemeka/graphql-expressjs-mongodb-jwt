const bcrypt = require("bcryptjs")
const {JWT_SECRET_KEY} = require('../config/env')
const jwt = require('jsonwebtoken');

const generateToken = async (payload) => {
    return await jwt.sign(payload,JWT_SECRET_KEY,
        {
            expiresIn:'1h'
        }
    );
}


module.exports = {
    generateToken
}
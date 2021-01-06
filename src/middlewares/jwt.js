const {JWT_SECRET_KEY} = require('../config/env')
const jwt = require('jsonwebtoken');

const generateToken = async (payload) => {
    return await jwt.sign(payload,JWT_SECRET_KEY,
        {
            expiresIn:'1h'
        }
    );
}

const decodeToken = (token) => jwt.verify(token, JWT_SECRET_KEY)

const authorization = (req,res,next) => {
    const authHeader = req.get("Authorization");
    // console.log({req})
    req.isAuth = false;
    if(!authHeader){
        return next();
    }
    
    const token = authHeader.split(' ')[1];
    if(!token || token === ''){
        return next();
    }
    let decodedToken;
    try{
        decodedToken = decodeToken(token)
    }catch(err){
        return next();
    }

    if(!decodedToken){
        return next();
    }

    req.isAuth = true;
    req.user = decodedToken;
    next();
    

}

module.exports = {
    generateToken,
    authorization
}
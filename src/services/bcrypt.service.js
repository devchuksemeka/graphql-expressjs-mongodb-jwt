const bcrypt = require("bcryptjs")

const getHashPassword = (password) => {
    return bcrypt.hashSync(password,12)
}

module.exports = {
    getHashPassword
}
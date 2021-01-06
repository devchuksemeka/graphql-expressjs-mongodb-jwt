const bcrypt = require("bcryptjs")

const getHashPassword = (password) => {
    return bcrypt.hashSync(password,12)
}
const isPasswordValid = (password, hashPassword) => {
    return bcrypt.compareSync(password,hashPassword)
}

module.exports = {
    getHashPassword,
    isPasswordValid
}
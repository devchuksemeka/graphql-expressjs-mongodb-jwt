const UserModel = require("../models/User")

const getUsersList = async () => {
    try {
        const usersList = await UserModel.find({})
        return usersList
    } catch (error) {
        return []
    }
}
const addUser = async (payload = {
    firstName:null,
    lastName:null,email: null,
    password: null
}) => {
    try {
        const {
            firstName,
            lastName, 
            email,
            password
        } = payload
        const user = new UserModel({
            firstName,
            lastName,
            email,
            password
        })
        return await user.save()
    } catch (error) {
        return null
    }
}

module.exports = {
    getUsersList,
    addUser
}
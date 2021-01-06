const { generateToken } = require("../middlewares/jwt")
const UserModel = require("../models/User")
const { isPasswordValid } = require("./bcrypt.service")

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
    lastName:null,
    email: null,
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

const loginUser = async (payload = {
    email: null,
    password: null
}) => {
    try {
        const {
            email,
            password
        } = payload
        const user =  await UserModel.findOne({email})
        if(!user) throw new Error('Invalid credentials provided')
        if(!isPasswordValid(password, user.password)) throw new Error('Invalid credentials provided')

        // generate JWT token
        const token = await generateToken({
            firstName: user.firstName,
            email: user.email,
            lastName: user.lastName,
        })
        return {
            user,
            token
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    getUsersList,
    addUser,
    loginUser
}
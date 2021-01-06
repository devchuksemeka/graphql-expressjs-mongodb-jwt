const mongoose = require('mongoose');
const { getHashPassword } = require('../services/bcrypt.service');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName:  {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
});
userSchema.pre('save', function(done) {
    if(this.isModified('password')){
        const password = this.get('password')
        const hashed = getHashPassword(password);
        this.set('password', hashed);
    }
    done()
});
const UserModel = mongoose.model('User',userSchema)
module.exports = UserModel
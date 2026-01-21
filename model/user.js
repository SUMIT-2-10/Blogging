
const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('node:crypto');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: './image/profile-icon-png-910.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

}, { timestamps: true }
);

userSchema.pre('save', async function () {
    const user = this;
    if (!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const heshedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest("hex");
    
    user.salt = salt;
    user.password = heshedPassword;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
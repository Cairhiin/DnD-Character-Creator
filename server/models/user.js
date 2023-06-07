import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const User = mongoose.model('User', UserSchema);

export const getUserById = async function(id) {
    const user = await User.findById(id);
    return user;
};

export const getUserByUsername = async function(username) {
    const user = await User.findOne({ username: username });
    return user;
}

export const addUser = async function(user) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    await user.save();
};

export const comparePassword = async function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}
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

User.getUserById = async function(id) {
    const users = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "characters",
                localField: "_id",
                foreignField: "userId",
                as: "characters"
            },        
        }
    ]);
    
    if (users) {
        return users[0];
    }

    return [];
};

User.getUserByUsername = async function(username) {
    const user = await User.findOne({ username: username });
    return user;
}

User.addUser = async function(user) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    await user.save();
};

User.comparePassword = async function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

User.getCharacters = async function(userId) {
    const user = await User.getUserById(userId);
    
    if (user) {
        return user.characters;   
    }

    return [];
}
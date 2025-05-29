import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
    feeling1: String,
    feeling2: String,
    feeling3: String,
    feeling4: String,
    phraseGratitude: String,
    regle: String,
    date: { type: Date, default: Date.now },
    userLocalDate: { type: Date },
    timezone: { type: String },
});

const userSchema = new mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mail: { type: String, required: true },
    mailHash: { type: String },
    feelings: [{ type: String }],
    responses: [responseSchema],
    theme: { type: String, default: 'colorful' },
    phraseRegister: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
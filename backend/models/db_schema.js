const mongoose = require('mongoose');

// Questions Schema
const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postedOn: { type: Date, default: Date.now }
});

// Answers Schema
const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answerText: { type: String, required: true },
    answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answeredOn: { type: Date, default: Date.now }
});

// Users Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    registeredOn: { type: Date, default: Date.now }
});

// Create models
const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);
const User = mongoose.model('User', userSchema);

// Export the models
module.exports = { Question, Answer, User };

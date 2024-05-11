const { Question, Answer } = require('../models/db_schema.js'); // Import models from db_schema

async function getAllQuestions() {
    try {
        // Retrieves all questions and populates the postedBy field to show user details
        return await Question.find().populate('postedBy');
    } catch (error) {
        console.error('Error retrieving all questions:', error);
        throw error;
    }
}

async function createQuestion(questionData) {
    try {
        // Create a new question using the provided data
        const question = new Question(questionData);
        await question.save();
        return question;
    } catch (error) {
        console.error('Error creating a new question:', error);
        throw error;
    }
}

async function getQuestionById(questionId) {
    try {
        // Retrieves a single question by its ID and populates the postedBy field
        return await Question.findById(questionId).populate('postedBy');
    } catch (error) {
        console.error('Error retrieving question by ID:', error);
        throw error;
    }
}

async function addAnswer(questionId, answerData) {
    try {
        // Create a new answer and append it to the answers array of the specific question
        const answer = new Answer(answerData);
        await answer.save();
        await Question.findByIdAndUpdate(questionId, { $push: { answers: answer._id } });
        return answer;
    } catch (error) {
        console.error('Error adding an answer to the question:', error);
        throw error;
    }
}

module.exports = { getAllQuestions, createQuestion, getQuestionById, addAnswer };

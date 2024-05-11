const { Answer, Question } = require('../models/db_schema');

async function updateAnswer(answerId, method, questionId) {
    try {
        switch (method) {
            case 'upvote':
                // Increment the votes field of the answer
                return await Answer.findByIdAndUpdate(answerId, { $inc: { votes: 1 } }, { new: true });
            case 'downvote':
                // Decrement the votes field of the answer
                return await Answer.findByIdAndUpdate(answerId, { $inc: { votes: -1 } }, { new: true });
            case 'accept':
                // Set the accepted field of the answer and update the answered field of the question
                const answer = await Answer.findByIdAndUpdate(answerId, { accepted: true }, { new: true });
                await Question.findByIdAndUpdate(questionId, { answered: answerId }, { new: true });
                return answer;
            default:
                throw new Error('Invalid method for updating answer');
        }
    } catch (error) {
        console.error('Error updating answer:', error);
        throw error;
    }
}

module.exports = { updateAnswer };

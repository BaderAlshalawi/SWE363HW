const express = require('express');
const router = express.Router();
const answersController = require('../controllers/answer_controller.js');

// Route to update an answer
router.get('/:answerId', async (req, res) => {
    try {
        const { method, questionId } = req.query; // Assuming method and questionId are passed as query parameters
        await answersController.updateAnswer(req.params.answerId, method, questionId);
        res.redirect(`/questions/${questionId}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

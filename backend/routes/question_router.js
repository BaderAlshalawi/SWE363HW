const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questions_controller.js');

// Route to get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await questionsController.getAllQuestions();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to create a new question
router.post('/', async (req, res) => {
    try {
        const newQuestion = await questionsController.createQuestion(req.body);
        res.json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single question by ID
router.get('/:id', async (req, res) => {
    try {
        const question = await questionsController.getQuestionById(req.params.id);
        res.render('question.njk', { question }); // Assuming you have a template named question.njk
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add an answer to a question
router.post('/:id', async (req, res) => {
    try {
        await questionsController.addAnswer(req.params.id, req.body);
        res.redirect(`/questions/${req.params.id}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

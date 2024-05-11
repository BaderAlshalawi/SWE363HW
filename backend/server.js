

const express = require('express');
const nunjucks = require('nunjucks');
const cors = require('cors');
const bodyParser = require('body-parser');
const answersRouter = require('./routes/answer_router'); // Make sure the path is correct
const questionsRouter = require('./routes/question_router'); // Make sure the path is correct

const app = express();

// Port number
const PORT = 3000;

// Enabling CORS
app.use(cors());

// Configure Nunjucks to render files in the 'views' directory
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Serve static files from 'public' directory
app.use(express.static('public'));

// Parse JSON and url-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index.njk');
});

// Use routers
app.use('/answer', answersRouter);
app.use('/question', questionsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


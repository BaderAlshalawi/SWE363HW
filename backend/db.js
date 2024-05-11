const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/202032320';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(mongoURI, options)
    .then(() => console.log('MongoDB connected to 202032320 database'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;


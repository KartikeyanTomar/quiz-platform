const connectDB = require('./config/database');

// Connect to database
connectDB();

// Start the server
require('./app');

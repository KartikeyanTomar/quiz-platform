
const connectDB = require('./server/config/database');

// Connect to database
connectDB();

// Start the server
require('./server/app');

const express = require('express');
const app = express();
const { connectToMongoDB, listDatabases, client } = require('./my-mongodb-app/connection');  // Importing the connection

// Call the function to connect to MongoDB
connectToMongoDB();

// Example route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Route to list databases
app.get('/databases', async (req, res) => {
    await listDatabases(); // List databases in the console
    res.send('Databases displayed in the console');
});

// Server running on port 3000, listening on all network interfaces
app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});

// When the server is stopped, close the MongoDB connection
process.on('SIGINT', async () => {
    await client.close();
    console.log('❌ Connection closed');
    process.exit(0);
});

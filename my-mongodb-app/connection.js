// Load environment variables from the .env file
require('dotenv').config();

const { MongoClient } = require("mongodb");

let client;

async function connectToMongoDB() {
    const uri = process.env.MONGO_URI; // Use the MongoDB connection URI from the .env file
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("✅ Connected to MongoDB Atlas");
    } catch (error) {
        console.error("❌ Error connecting:", error);
    }
}

async function listDatabases() {
    try {
        const databasesList = await client.db().admin().listDatabases();
        console.log("📂 Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } catch (error) {
        console.error("❌ Error getting databases:", error);
    }
}

module.exports = {
    connectToMongoDB,
    listDatabases,
    client // Export the client if you need to use it elsewhere
};

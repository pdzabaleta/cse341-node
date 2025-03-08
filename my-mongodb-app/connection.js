const { MongoClient } = require("mongodb");

let client;

async function connectToMongoDB() {
    const uri = "mongodb+srv://pdzabaleta:Nieve.01@cluster0.0lrgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("✅ Conectado a MongoDB Atlas");
    } catch (error) {
        console.error("❌ Error al conectar:", error);
    }
}

async function listDatabases() {
    try {
        const databasesList = await client.db().admin().listDatabases();
        console.log("📂 Bases de datos:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } catch (error) {
        console.error("❌ Error al obtener bases de datos:", error);
    }
}

module.exports = {
    connectToMongoDB,
    listDatabases,
    client // Exportamos el cliente para usarlo en otro lugar si es necesario
};

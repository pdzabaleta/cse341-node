const express = require('express');
const app = express();
const { connectToMongoDB, listDatabases, client } = require('./my-mongodb-app');  // Importamos la conexión

// Llamamos a la función para conectar a MongoDB
connectToMongoDB();

// Una ruta de ejemplo
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Una ruta para listar bases de datos
app.get('/databases', async (req, res) => {
    await listDatabases(); // Lista las bases de datos en la consola
    res.send('Bases de datos mostradas en la consola');
});

// Servidor corriendo en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

// Cuando detengas el servidor, cerramos la conexión a MongoDB
process.on('SIGINT', async () => {
    await client.close();
    console.log('❌ Conexión cerrada');
    process.exit(0);
});

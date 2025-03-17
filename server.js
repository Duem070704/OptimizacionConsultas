require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db'); // Importa la conexión a la base de datos
const transaccionRoutes = require('./src/router/transaccionesRouter');

const app = express();
// Conectar a MongoDB
connectDB();

app.use(express.json());
app.use('/api', transaccionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

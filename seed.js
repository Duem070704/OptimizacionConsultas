const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const Transaccion = require('./src/models/transaccionModels');

async function seedDatabase() {
  try {
    console.log("Generando datos de prueba...");
    
    // Conectar a MongoDB
    await connectDB();
    
    // Crear un solo array con 50,000 documentos
    const transacciones = Array.from({ length: 50000 }, (_, i) => ({
      nombre_cliente: `Cliente ${i}`,
      fecha_transaccion: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      categoria: ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Mueblería'][Math.floor(Math.random() * 5)],
      monto: Math.floor(Math.random() * 5000) + 500,
      metodo_pago: ['Tarjeta', 'Efectivo', 'Transferencia', 'Crédito'][Math.floor(Math.random() * 4)],
      estado_transaccion: ['Completada', 'Pendiente', 'Cancelada'][Math.floor(Math.random() * 3)],
      ciudad: ['Ciudad A', 'Ciudad B', 'Ciudad C', 'Ciudad D'][Math.floor(Math.random() * 4)],
      codigo_producto: `P-${Math.floor(Math.random() * 1000) + 1}`,
      descuento_aplicado: Math.floor(Math.random() * 50),
    }));

    // Insertar todas las transacciones de una vez
    await Transaccion.insertMany(transacciones);
    console.log("Todos los datos insertados correctamente.");

  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
  } finally {
    // Cerrar conexión si está abierta
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("Conexión cerrada.");
    }
  }
}

seedDatabase();

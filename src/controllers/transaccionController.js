const Transaccion = require('../models/transaccionModels');

// Ruta para crear los índices 
const crearIndices = async (req, res) => {
  try {
    const transaccionIndex = Transaccion.collection;

    // Crear los índices 
    await transaccionIndex.createIndex({ fecha_transaccion: 1 });    
    await transaccionIndex.createIndex({ monto: 1, categoria: 1 });  
    await transaccionIndex.createIndex({ descuento_aplicado: 1, metodo_pago: 1, estado_transaccion: 1 }); 
    await transaccionIndex.createIndex({ fecha_transaccion: -1 });  
    await transaccionIndex.createIndex({ codigo_producto: 1 });     
    await transaccionIndex.createIndex({ categoria: "text" });    

    console.log('Índices creados exitosamente');
    res.status(201).json({ message: 'Índices creados exitosamente' });
  } catch (error) {
    console.error('Error al crear los índices:', error);
    res.status(500).json({ message: 'Error al crear los índices', error });
  }
};


// Función para obtener transacciones con monto entre 1000 y 5000, por categoría y ordenadas por fecha
const MontoCategoriaFecha = async (req, res) => {
  try {
    const resultado = await Transaccion.find({
      monto: { $gte: 1000, $lte: 5000 },
      categoria: "Electrónica" // Filtrar por categoría sin usar texto
    })
    .sort({ fecha_transaccion: -1 }) // Ordenar por fecha de transacción en orden descendente
    .explain("executionStats"); // Obtener estadísticas de ejecución

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener transacciones", error });
  }
};

// Función para obtener transacciones con descuento mayor a 20, método de pago "Tarjeta" y estado "Completada"
const DescuentoMetodoEstado = async (req, res) => {
  try {
    const resultado = await Transaccion.find({
      descuento_aplicado: { $gt: 20 },
      metodo_pago: "Tarjeta",
      estado_transaccion: "Completada"
    }).explain("executionStats"); // Obtener estadísticas de ejecución

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener transacciones", error });
  }
};

// Función para obtener los 5 productos más vendidos filtrando por fecha de transacción
const TopProductosPorFecha = async (req, res) => {
  try {
    const resultado = await Transaccion.aggregate([
      { $match: { fecha_transaccion: { $gte: new Date("2024-01-01"), $lt: new Date("2024-12-31") } } }, // Filtrar por fecha
      { $group: { _id: "$codigo_producto", total: { $sum: 1 } } }, // Agrupar por producto y sumar la cantidad
      { $sort: { total: -1 } }, // Ordenar por total descendente
      { $limit: 5 } // Limitar a los 5 productos más vendidos
    ]).explain("executionStats"); // Obtener estadísticas de ejecución

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos más vendidos", error });
  }
};

module.exports = {
  crearIndices,          // Ruta para crear índices
  MontoCategoriaFecha,   // Ruta para las transacciones con monto y categoría
  DescuentoMetodoEstado, // Ruta para las transacciones con descuento, método y estado
  TopProductosPorFecha,  // Ruta para los productos más vendidos
};

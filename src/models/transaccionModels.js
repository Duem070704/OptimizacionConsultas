const mongoose = require('mongoose');

const TransaccionSchema = new mongoose.Schema({
  nombre_cliente: { type: String, required: true },
  fecha_transaccion: { type: Date, required: true },
  categoria: { type: String, enum: ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Mueblería'], required: true },
  monto: { type: Number, required: true, min: 500 },
  metodo_pago: { type: String, enum: ['Tarjeta', 'Efectivo', 'Transferencia', 'Crédito'], required: true },
  estado_transaccion: { type: String, enum: ['Completada', 'Pendiente', 'Cancelada'], required: true },
  ciudad: { type: String, enum: ['Ciudad A', 'Ciudad B', 'Ciudad C', 'Ciudad D'], required: true },
  codigo_producto: { type: String, required: true },
  descuento_aplicado: { type: Number, min: 0, max: 50, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaccion', TransaccionSchema);

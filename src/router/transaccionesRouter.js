const express = require("express");
const router = express.Router();
const transaccionController = require("../controllers/transaccionController");

router.get("/DescuentoMetodoEstado", transaccionController.DescuentoMetodoEstado);
router.get("/MontoCategoriaFecha", transaccionController.MontoCategoriaFecha);
router.get("/TopProductosPorFecha", transaccionController.TopProductosPorFecha);
router.post('/CrearIndices',transaccionController.crearIndices);

module.exports = router;

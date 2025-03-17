require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env
const express = require('express');  // Importar Express.js para crear el servidor
const mongoose = require('mongoose');  // Importar Mongoose para manejar la conexión a MongoDB

const connectDB = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      
    });
    console.log("🚀✅Conectado a MongoDB");
  } catch (error) {
    console.error("❌🔥Error conectando a MongoDB:", error);
  }
};

module.exports = connectDB;

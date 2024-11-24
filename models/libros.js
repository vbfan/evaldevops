const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AutorSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true }
});

const LibroSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    autor: { type: Schema.Types.ObjectId, ref: 'Autor', required: true }
});

const Autor = mongoose.model('Autor', AutorSchema);
const Libro = mongoose.model('Libro', LibroSchema);

module.exports = { Autor, Libro };
const express = require('express');
const mongoose = require('mongoose');
const { Libro, Autor } = require('./models/libros');

const app = express();
const path = require('path');
const port = 3000;

mongoose.connect('mongodb://localhost:27017/libros', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function initializeData() {
    const autorCount = await Autor.countDocuments();
    const libroCount = await Libro.countDocuments();

    if (autorCount === 0 && libroCount === 0) {
        const autor1 = new Autor({ nombre: 'Gabriel', apellido: 'García Márquez' });
        const autor2 = new Autor({ nombre: 'Isabel', apellido: 'Allende' });

        await autor1.save();
        await autor2.save();

        const libro1 = new Libro({ titulo: 'Cien dias de Soledad', descripcion: 'Una novela mágica', autor: autor1._id });
        const libro2 = new Libro({ titulo: 'La Casa de los Casos', descripcion: 'Una novela de realismo mágico', autor: autor2._id });

        await libro1.save();
        await libro2.save();

        console.log('Datos de prueba insertados');
    } else {
        console.log('La base de datos ya contiene datos');
    }
}

initializeData();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/autores', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'autores.html'));
});

app.get('/api/libros', async (req, res) => {
    try {
        const libros = await Libro.find().populate('autor');
        res.json(libros);
    } catch (error) {
        res.status(500).send('Error al obtener libros');
    }
});

app.get('/api/libros/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id).populate('autor');
        if (!libro) {
            return res.status(404).send('Libro no encontrado');
        }
        res.json(libro);
    } catch (error) {
        res.status(500).send('Error al obtener el libro');
    }
});

app.get('/api/autores', async (req, res) => {
    try {
        const autores = await Autor.find();
        res.json(autores);
    } catch (error) {
        res.status(500).send('Error al obtener autores');
    }
});

app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});
module.exports = app;
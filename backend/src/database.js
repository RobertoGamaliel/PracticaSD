const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI
? process.env.MONGODB_URI
: 'mongodb+srv://Gsanchez94:contraseña.@cluster0.mqwpt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URI);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Bsase de datos conectada');
});
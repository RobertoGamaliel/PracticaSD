//modelo de datos de loas usuarios
const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
}, {
    timestamps: true//fecha de creacion y fecha de modificacion
});

module.exports = model('User', userSchema);
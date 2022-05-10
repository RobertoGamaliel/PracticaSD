//modelo de datos de loas usuarios
const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    comentario:{
        type:String,
        required: false
    },
    sexo:{
        
    },
    contrasena:{
        type:String,
        required:false,
        unique:false
    }
}, {
    timestamps: true//fecha de creacion y fecha de modificacion
});

module.exports = model('User', userSchema);
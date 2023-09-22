const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    nombres: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellidos: {
        type: String,
    },
    puesto: {
        type: String,
    },
    encargado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    },
    telefono1: {
        type: String
    },
    telefono2: {
        type: String
    },
    direccion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }, 
    creado_el: {
        type: Date
    },
    creado_por: {
        type: String
    },
    modificado_el: {
        type: Date
    },
    modificado_por: {
        type: String
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
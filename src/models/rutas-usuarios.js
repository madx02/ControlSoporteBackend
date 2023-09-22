const { Schema, model } = require('mongoose');
const Ruta = require('./ruta');
const Usuario = require('./usuario');

const RutaUsuariosSchema = Schema({
    ruta: {
        type: Schema.Types.ObjectId,
        ref: Ruta,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: Usuario,
        required: true
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

RutaUsuariosSchema.methods.toJSON = function() {
    const { __v, _id, ...rutaUsuarios } = this.toObject();
    rutaUsuarios.uid = _id;
    return rutaUsuarios;
}

module.exports = model('RutaUsuarios', RutaUsuariosSchema);
const { Schema, model } = require('mongoose');
const Usuario = require('./usuario');
const Cliente = require('./cliente');

const PlannedSchema = Schema({
    idPlanned: {
        type: String,
        required: true,
        unique: true
    },
    idCliente: {
        type: String,
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: Cliente,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: Usuario,
        required: true
    },
    fecha_programada: {
        type: Date
    },
    descripcion: {
        type: String
    },
    situacion: {
        type: String,
        default: "P"
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

PlannedSchema.methods.toJSON = function() {
    const { __v, _id, ...planned } = this.toObject();
    planned.uid = _id;
    return planned;
}

module.exports = model('Planned', PlannedSchema);
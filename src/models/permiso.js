const { Schema, model } = require('mongoose');

const PermisoSchema = Schema({
    modulo: {
        type: String,
        required: [true, 'El modulo es obligatorio'],
        unique: true
    },
    tipoPermiso: {
        type: String,
        required: [true, 'El tipo permiso es obligatorio']
    },
    path: {
        type: String,
    },
    title: {
        type: String
    },
    icon: {
        type: String
    },
    clas : {
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

PermisoSchema.methods.toJSON = function() {
    const { __v, _id, ...permiso } = this.toObject();
    permiso.uid = _id;
    return permiso;
}

module.exports = model('Permiso', PermisoSchema);
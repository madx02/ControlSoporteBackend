const { Schema, model } = require('mongoose');

const RutaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    region: {
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

RutaSchema.methods.toJSON = function() {
    const { __v, _id, ...ruta } = this.toObject();
    ruta.uid = _id;
    return ruta;
}

module.exports = model('Ruta', RutaSchema);
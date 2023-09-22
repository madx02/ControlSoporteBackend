const { Schema, model } = require('mongoose');

const ConfiguracionSchema = Schema({
    IdConfiguracion: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
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

ConfiguracionSchema.methods.toJSON = function() {
    const { __v, _id, ...configuracion } = this.toObject();
    configuracion.uid = _id;
    return configuracion;
}

module.exports = model('Configuracion', ConfiguracionSchema);
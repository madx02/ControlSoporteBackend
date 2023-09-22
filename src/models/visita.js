const { Schema, model } = require('mongoose');
const Planned = require('./planned');

const VisitaSchema = Schema({
    idVisita: {
        type: String,
        required: true,
        unique: true
    },
    idPlanned: {
        type: String,
        required: true,
        unique: true
    },
    planned: {
        type: Schema.Types.ObjectId,
        ref: Planned,
        required: true
    },
    fecha_inicio: {
        type: Date
    },
    fecha_fin: {
        type: Date
    },
    descripcion: {
        type: String
    },
    observacion1: {
        type: String
    },
    observacion2: {
        type: String
    },
    situacion: {
        type: String,
        default: 'P'
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

VisitaSchema.methods.toJSON = function() {
    const { __v, _id, ...visita } = this.toObject();
    visita.uid = _id;
    return visita;
}

module.exports = model('Visita', VisitaSchema);
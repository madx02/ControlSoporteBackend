const { Schema, model } = require('mongoose');
const Ruta = require('./ruta');

const ClienteSchema = Schema({
    idcliente: {
        type: String,
        required: true,
        unique: true
    },
    nombreComercial: {
        type: String,
        required: true,
    },
    razonSocial: {
        type: String,
        required: true
    },
    nit: {
        type: String,
        required: true,
        unique: true
    },
    telefono1: {
        type: String,
    },
    telefono2: {
        type: String,
    },
    correo1: {
        type: String,
    },
    correo2: {
        type: String,
    },
    direccion: {
        type: String,
    },
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true,
          index: '2dsphere'
        }
    },
    ruta: {
        type: Schema.Types.ObjectId,
        ref: Ruta
    },
    mapa: {
        type: String
    }, 
    contacto: {
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

ClienteSchema.methods.toJSON = function() {
    const { __v, password, _id, ...cliente } = this.toObject();
    cliente.uid = _id;
    return cliente;
}

module.exports = model('Cliente', ClienteSchema);
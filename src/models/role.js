const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del modulo es obligatorio'],
        unique: true
    },
    descripcion: {
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

RoleSchema.methods.toJSON = function() {
    const { __v, _id, ...role } = this.toObject();
    role.uid = _id;
    return role;
}

module.exports = model('Role', RoleSchema);
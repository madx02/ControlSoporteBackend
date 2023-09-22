const { Schema, model } = require('mongoose');
const Role = require('./role');
const Permiso = require('./permiso');

const RolePermisosSchema = Schema({
    role: {
        type: Schema.Types.ObjectId,
        ref: Role,
        required: true
    },
    permiso: {
        type: Schema.Types.ObjectId,
        ref: Permiso,
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

RolePermisosSchema.methods.toJSON = function() {
    const { __v, _id, ...rolePermiso } = this.toObject();
    rolePermiso.uid = _id;
    return rolePermiso;
}

module.exports = model('RolePermiso', RolePermisosSchema);
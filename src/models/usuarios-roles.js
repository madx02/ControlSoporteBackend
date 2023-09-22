const { Schema, model } = require('mongoose');
const Role = require('./role');
const Usuario = require('./usuario');

const UsuarioRolesSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: Usuario,
        required: true
    },
    role:  {
        type: Schema.Types.ObjectId,
        ref: Role,
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

UsuarioRolesSchema.methods.toJSON = function() {
    const { __v, _id, ...usuarioRoles } = this.toObject();
    usuarioRoles.uid = _id;
    return usuarioRoles;
}

module.exports = model('UsuarioRoles', UsuarioRolesSchema);
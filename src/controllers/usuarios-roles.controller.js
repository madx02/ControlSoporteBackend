const { response } = require('express');
const UsuarioRoles = require('../models/usuarios-roles');
const Usuario = require('../models/usuario');
const RolePermiso = require('../models/roles-permisos')

const usuarioRolesGet = async (req = request, res = response) => {
    try {
        const query = { estado: true };

        const [totalRegistros, datos] = await Promise.all([
            UsuarioRoles.countDocuments(query),
            UsuarioRoles.find(query)
        ])

        res.status(200).json({
            codigo: 0,
            msg: 'Consulta realizada con exito',
            totalRegistros,
            datos
        });
    } catch (error) {
        res.status(500).json({
            codigo: 2,
            msg: 'Error al obtener los datos',
            error
        });
    }

}

const usuarioRolesGetId = async (req = request, res = response) => {
    try {
        
        const id = req.params.id;
        const queryUser = { usuario : id }
        const userRoles = await UsuarioRoles.find(queryUser).populate({ path: 'usuario', select: ['_id','correo','nombres','apellidos','puesto']})
                                                            .populate({ path: 'role', select: ['_id','nombre','descripcion']});
        const queryRole = { role : userRoles[0].role._id }
        const rolesPermiso = await RolePermiso.find(queryRole)
                                   .populate({ path:'permiso', select: ['_id','modulo','permiso', 'path','title', 'clas','icon','tipoPermiso']})
                                   .select(['_id','role','permiso']);

        const respuest = {
            usuario: userRoles[0].usuario,
            role: userRoles[0].role,
            rolesPermiso
        }
        
        res.status(200).json({
            codigo: 0,
            msg: 'Consulta realizada con exito',
            respuest
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            codigo: 2,
            msg: 'Error al obtener los datos',
            error
        });
    }

}

const usuarioRolesPost = async (req = request, res = response) => {
    try {

        const nDate = new Date().toUTCString('es-GT', {
            timeZone: process.env.TZ
        });

        const { usuario,  role,  estado = true, creado_el = nDate, creado_por, modificado_el = nDate, modificado_por } = req.body;
        const dato = new UsuarioRoles({ usuario, role,  estado, creado_el, creado_por, modificado_el, modificado_por});

        // Guardar en BD
        await dato.save();
        res.status(200).json({
            codigo: 0,
            msg: 'Registro Creado',
            dato
        });

    } catch (error) {
        res.status(500).json({
            codigo: 2,
            msg: 'En error el proceso de creación',
            error
        });
    }
}

const usuarioRolesPut = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const { _id, usuario,  role, ...resto } = req.body;

        const dato = await UsuarioRoles.findByIdAndUpdate(id, resto);

        res.status(200).json({
            codigo: 0,
            msg: 'Se guardaron los cambios',
            dato
        });
    } catch (error) {
        res.status(500).json({
            codigo: 2,
            msg: 'Error el proceso de actualizacion',
            error
        });
    }

}

const usuarioRolesDel = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const uid = req.uid;
        // Borrado logico
        const dato = await UsuarioRoles.findByIdAndUpdate(id, { estado: false });


        res.status(200).json({
            codigo: 0,
            msg: 'Registro borrado',
            dato
        });
    } catch (error) {
        res.status(500).json({
            codigo: 2,
            msg: 'Error en el proceso de borrado',
            error
        });
    }


}

module.exports = {
    usuarioRolesGet,
    usuarioRolesGetId,
    usuarioRolesPost,
    usuarioRolesPut,
    usuarioRolesDel
}
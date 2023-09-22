const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    try {
        //const {q, nombre, apikey} = req.query; 
        const { limite = 100, desde = 0 } = req.query;
        const query = { estado: true };

        const [totalRegistros, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            codigo: 0,
            msg: 'Consulta realizada con exito',
            totalRegistros,
            usuarios
        });

    } catch (error) {
        res.status(500).json({
            codigo: 2,
            msg: 'Error al obtener los datos',
            error
        });
    }

}

const usuariosPost = async (req = request, res = response) => {
    try {

        const nDate = new Date().toUTCString('es-GT', {
            timeZone: process.env.TZ
        });

        const { correo, password, nombres, apellidos, puesto, encargado, telefono1, telefono2, direccion, estado, creado_el = nDate, creado_por, modificado_el = nDate, modificado_por } = req.body;
        const usuario = new Usuario({ correo, password, nombres, apellidos, puesto, encargado, telefono1, telefono2, direccion, estado, creado_el, creado_por, modificado_el, modificado_por });

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Guardar en BD
        await usuario.save();

        // Generar el JWT
        const token = await generarJWT(usuario.id);    

        res.status(200).json({
            codigo: 0,
            msg: 'Usuario creado con exito',
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            codigo: 2,
            msg: 'En error el proceso de creación',
            error
        });
    }

}

const usuariosPut = async (req = request, res = response) => {
    try {
        const id = req.params.id;

        const { _id, password, ...resto } = req.body;

        // Validar contra base de datos
        if (password) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto);

        res.status(200).json({
            codigo: 0,
            msg: 'Se guardaron los cambios',
            usuario
        });
    } catch (error) {
        res.status(500).json({
            codigo: 2,
            msg: 'Error el proceso de actualizacion',
            error
        });
    }

}

const usuariosDel = async (req = request, res = response) => {
    try {
        const id = req.params.id;

        const uid = req.uid;
        // Borrado logico
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


        res.status(200).json({
            codigo: 0,
            msg: 'Registro borrado',
            usuario
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
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDel
}
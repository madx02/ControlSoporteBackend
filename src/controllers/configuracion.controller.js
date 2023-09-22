const { response } = require('express');
const Configuracion = require('../models/configuracion');

const configuracionesGet = async (req = request, res = response) => {
    try {
        const query = { estado: true };

        const [totalRegistros, datos] = await Promise.all([
            Configuracion.countDocuments(query),
            Configuracion.find(query)
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

const configuracionesPost = async (req = request, res = response) => {
    try {

        const nDate = new Date().toUTCString('es-GT', {
            timeZone: process.env.TZ
        });

        const { IdConfiguracion, valor,  nombre,  estado = true, creado_el = nDate, creado_por, modificado_el = nDate, modificado_por } = req.body;
        const dato = new Configuracion({ IdConfiguracion, valor,  nombre,  estado, creado_el, creado_por, modificado_el, modificado_por});

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

const configuracionesPut = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const { _id, IdConfiguracion, valor, nombre, ...resto } = req.body;

        const dato = await Configuracion.findByIdAndUpdate(id, resto);

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

const configuracionesDel = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const uid = req.uid;
        // Borrado logico
        const dato = await Configuracion.findByIdAndUpdate(id, { estado: false });


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
    configuracionesGet,
    configuracionesPost,
    configuracionesPut,
    configuracionesDel
}
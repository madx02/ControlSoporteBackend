const { response } = require('express');
const Ruta = require('../models/ruta');

const rutasGet = async (req = request, res = response) => {
    try {
        const query = { estado: true };

        const [totalRegistros, datos] = await Promise.all([
            Ruta.countDocuments(query),
            Ruta.find(query)
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

const rutasPost = async (req = request, res = response) => {
    try {

        const nDate = new Date().toUTCString('es-GT', {
            timeZone: process.env.TZ
        });

        const { nombre, descripcion, region, estado = true, creado_el = nDate, creado_por, modificado_el = nDate, modificado_por } = req.body;
        const dato = new Ruta({ nombre, descripcion, region,  estado, creado_el, creado_por, modificado_el, modificado_por});

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

const rutasPut = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const { _id, nombre, descripcion, region,...resto } = req.body;

        const dato = await Ruta.findByIdAndUpdate(id, resto);

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

const rutasDel = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const uid = req.uid;
        // Borrado logico
        const dato = await Ruta.findByIdAndUpdate(id, { estado: false });


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
    rutasGet,
    rutasPost,
    rutasPut,
    rutasDel
}
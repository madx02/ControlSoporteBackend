const { response } = require('express');
const { isValidObjectId, Mongoose } = require('mongoose');
const Visita = require('../models/visita');




const visitaGet = async (req = request, res = response) => {
    try {

        const query = { estado: true };

        const [totalRegistros, datos] = await Promise.all([
            Visita.countDocuments(query),
            Visita.find(query)
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


const visitaPost = async (req = request, res = response) => {
    try {

        const nDate = new Date().toUTCString('es-GT', {
            timeZone: process.env.TZ
        });

        const [totalRegistros] = await Promise.all([
            Visita.countDocuments()
        ])

        const newSecuencia = totalRegistros + 1;

        const prefijo = process.env.PREFIJO_VISITA;
        const tamanio = process.env.TAMANIO_MAXIMO_CORRELATIVO;
        const newCodigo = prefijo + newSecuencia.toString().padStart(tamanio, 0);
        
        const { idVisita = newCodigo, 
                idPlanned,
                planned,
                fecha_inicio,
                fecha_fin,
                descripcion, 
                observacion1, 
                observacion2,
                situacion, 
                estado = true,
                creado_el =  nDate,
                creado_por,
                modificado_el =  nDate,
                modificado_por} = req.body;

    

        const dato = new Visita({ idVisita, 
                                        idPlanned, 
                                        planned, 
                                        fecha_inicio, 
                                        fecha_fin,
                                        descripcion,
                                        observacion1,
                                        observacion2,
                                        situacion, 
                                        estado,
                                        creado_el,
                                        creado_por,
                                        modificado_el,
                                        modificado_por});    
        
        // Guardar en BD
        await dato.save();

        res.status(200).json({
            codigo: 0,
            msg: 'Visita creada con exito',
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


const visitaPut = async (req = request, res = response) => {
    try {
        const id = req.params.id;

        const { _id, ...resto } = req.body;

        const dato = await Visita.findByIdAndUpdate(id, resto);

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

const visitaDel = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const uid = req.uid;
        // Borrado logico
        const dato = await Visita.findByIdAndUpdate(id, { estado: false });

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
    visitaGet,
    visitaPost,
    visitaPut,
    visitaDel
}
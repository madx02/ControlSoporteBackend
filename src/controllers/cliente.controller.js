const { response } = require('express');
const Cliente = require('../models/cliente');




const clientesGet = async (req = request, res = response) => {
    try {

        const query = { estado: true };

        const [totalRegistros, datos] = await Promise.all([
            Cliente.countDocuments(query),
            Cliente.find(query)
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


const clientesPost = async (req = request, res = response) => {
    try {

        const nDate = new Date().toUTCString('es-GT', {
            timeZone: process.env.TZ
        });

        const [totalRegistros] = await Promise.all([
            Cliente.countDocuments()
        ])

        const newSecuencia = totalRegistros + 1;

        const prefijo = process.env.PREFIJO_CLIENTE;
        const tamanio = process.env.TAMANIO_MAXIMO_CORRELATIVO;
        const newCodigo = prefijo + newSecuencia.toString().padStart(tamanio, 0);
        
        const { idcliente = newCodigo, 
                nombreComercial, 
                razonSocial, 
                nit, 
                telefono1, 
                telefono2, 
                correo1, 
                correo2, 
                direccion, 
                location,
                ruta,
                contacto,
                estado = true,
                creado_el =  nDate,
                creado_por,
                modificado_el =  nDate,
                modificado_por} = req.body;

        const  longitud  = location.coordinates[0];
        const  latidud  = location.coordinates[1];
        

        const mapa = "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s" + latidud +"," + longitud + "!6i17!3m1!1ses!5m1!1ses";
        

        const cliente = new Cliente({ idcliente, 
                                        nombreComercial, 
                                        razonSocial, 
                                        nit, 
                                        telefono1, 
                                        telefono2, 
                                        correo1, 
                                        correo2, 
                                        direccion, 
                                        location,
                                        ruta,
                                        mapa,
                                        contacto,
                                        estado,
                                        creado_el,
                                        creado_por,
                                        modificado_el,
                                        modificado_por});    
        
        // Guardar en BD
        await cliente.save();

        res.status(200).json({
            codigo: 0,
            msg: 'Cliente creado con exito',
            cliente
        });

    } catch (error) {
        res.status(500).json({
            codigo: 2,
            msg: 'En error el proceso de creación',
            error
        });
    }

}


const clientesPut = async (req = request, res = response) => {
    try {
        const id = req.params.id;

        const { _id, ...resto } = req.body;

        const cliente = await Cliente.findByIdAndUpdate(id, resto);

        res.status(200).json({
            codigo: 0,
            msg: 'Se guardaron los cambios',
            cliente
        });
    } catch (error) {
        res.status(500).json({
            codigo: 2,
            msg: 'Error el proceso de actualizacion',
            error
        });
    }

}

const clientesDel = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const uid = req.uid;
        // Borrado logico
        const dato = await Cliente.findByIdAndUpdate(id, { estado: false });

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
    clientesGet,
    clientesPost,
    clientesPut,
    clientesDel
}
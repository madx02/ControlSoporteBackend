const { Router } = require('express');
const { clientesGet, clientesPost, clientesPut, clientesDel } = require('../controllers/cliente.controller');
const { check } = require('express-validator');
const { validarJWT }  = require('../middlewares/validarJWT')        

const router = Router();

router.get('/', [
    validarJWT
], clientesGet);

//metodo de creacion
router.post('/', [
    validarJWT,
    check('nombreComercial', 'El nombre comercial es obligatorio').not().isEmpty(),
    check('razonSocial', 'La razon social es obligatorio').not().isEmpty(),
    check('nit', 'El nit es obligatorio').not().isEmpty(),
    check('correo1','El correos es obligatorio').isEmail(),
    check('location', 'La localizacion es obligatorio').not().isEmpty()
], clientesPost);


//metodo de actualizacion
router.put('/:id', [
    validarJWT
],
clientesPut);


//metodo de borrado
router.delete('/:id', 
[
    validarJWT
],
clientesDel);

module.exports = router;
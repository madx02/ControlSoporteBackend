const { Router } = require('express');
const {   plannedGet, plannedPost, plannedPut, plannedDel } = require('../controllers/planned.controller');
const { check } = require('express-validator');
const { validarJWT }  = require('../middlewares/validarJWT')   

const router = Router();

router.get('/', [
    validarJWT
], plannedGet);

//metodo de creacion
router.post('/', [
    validarJWT,
    check('idCliente', 'El codigo del cliente es obligatorio').not().isEmpty(),
    check('cliente', 'El cliente es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('fecha_programada','La fecha de programacion es obligatoria').isDate()
], plannedPost);


//metodo de actualizacion
router.put('/:id', [
    validarJWT
], plannedPut);


//metodo de borrado
router.delete('/:id', 
[
    validarJWT
],plannedDel);

module.exports = router;
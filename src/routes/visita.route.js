const { Router } = require('express');
const {   visitaGet, visitaPost, visitaPut, visitaDel } = require('../controllers/visitas.controller');
const { check } = require('express-validator');
const { validarJWT }  = require('../middlewares/validarJWT')   

const router = Router();

router.get('/', [
    validarJWT
], visitaGet);

//metodo de creacion
router.post('/', [
    validarJWT
], visitaPost);


//metodo de actualizacion
router.put('/:id', [
    validarJWT
], visitaPut);


//metodo de borrado
router.delete('/:id', 
[
    validarJWT
],visitaDel);

module.exports = router;
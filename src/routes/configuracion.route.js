const { Router } = require('express');
const {  configuracionesGet,
         configuracionesPost,
         configuracionesPut,
         configuracionesDel } = require('../controllers/configuracion.controller');

const router = Router();

router.get('/', configuracionesGet);

//metodo de creacion
router.post('/', configuracionesPost);


//metodo de actualizacion
router.put('/:id', configuracionesPut);


//metodo de borrado
router.delete('/:id', configuracionesDel);

module.exports = router;
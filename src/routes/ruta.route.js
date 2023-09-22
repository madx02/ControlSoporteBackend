const { Router } = require('express');
const { rutasGet,
        rutasPost,
        rutasPut,
        rutasDel } = require('../controllers/ruta.controller');

const router = Router();

router.get('/', rutasGet);

//metodo de creacion
router.post('/', rutasPost);


//metodo de actualizacion
router.put('/:id', rutasPut);


//metodo de borrado
router.delete('/:id', rutasDel);

module.exports = router;
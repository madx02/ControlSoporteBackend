const { Router } = require('express');
const { permisosGet,
        permisosPost,
        permisosPut,
        permisosDel } = require('../controllers/permisos.controller');

const router = Router();

router.get('/', permisosGet);

//metodo de creacion
router.post('/', permisosPost);


//metodo de actualizacion
router.put('/:id', permisosPut);


//metodo de borrado
router.delete('/:id', permisosDel);

module.exports = router;
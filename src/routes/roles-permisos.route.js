const { Router } = require('express');
const {  rolePermisosGet,
    rolePermisosPost,
    rolePermisosPut,
    rolePermisosDel } = require('../controllers/roles-permisos.controller');

const router = Router();

router.get('/', rolePermisosGet);

//metodo de creacion
router.post('/', rolePermisosPost);


//metodo de actualizacion
router.put('/:id', rolePermisosPut);


//metodo de borrado
router.delete('/:id', rolePermisosDel);

module.exports = router;
const { Router } = require('express');
const {   usuarioRolesGet,
          usuarioRolesPost,
          usuarioRolesPut,
          usuarioRolesDel} = require('../controllers/usuarios-roles.controller');

const router = Router();

router.get('/', usuarioRolesGet);

//metodo de creacion
router.post('/', usuarioRolesPost);


//metodo de actualizacion
router.put('/:id', usuarioRolesPut);


//metodo de borrado
router.delete('/:id', usuarioRolesDel);

module.exports = router;
const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDel } = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', usuariosGet);

//metodo de creacion
router.post('/', usuariosPost);


//metodo de actualizacion
router.put('/:id', usuariosPut);


//metodo de borrado
router.delete('/:id', usuariosDel);

module.exports = router;
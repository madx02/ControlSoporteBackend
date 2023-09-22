const { Router } = require('express');
const {  rutaUsuariosGet,
         rutaUsuariosPost,
         rutaUsuariosPut,
         rutaUsuariosDel } = require('../controllers/rutas-usuarios.controller');

const router = Router();

router.get('/', rutaUsuariosGet);

//metodo de creacion
router.post('/', rutaUsuariosPost);


//metodo de actualizacion
router.put('/:id', rutaUsuariosPut);


//metodo de borrado
router.delete('/:id', rutaUsuariosDel);

module.exports = router;
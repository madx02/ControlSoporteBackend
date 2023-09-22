const { Router } = require('express');
const { rolesGet,
        rolesPost,
        rolesPut,
        rolesDel } = require('../controllers/roles.controller');

const router = Router();

router.get('/', rolesGet);

//metodo de creacion
router.post('/', rolesPost);


//metodo de actualizacion
router.put('/:id', rolesPut);


//metodo de borrado
router.delete('/:id', rolesDel);

module.exports = router;
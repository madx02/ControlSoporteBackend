const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            codigo: 1,
            msg: 'Se encontraron varios errores.',
            errors
        });
    }

    next();
}

module.exports = {
    validarCampos
}
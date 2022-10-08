
const router = require('express').Router();

const equipoController = require('../controllers/equipo');
const usuarioController = require('../controllers/usuario');


router.get('/equipo',equipoController.getEquipos);
router.get('/equipo/:id',equipoController.findEquipo);
router.post('/equipo',equipoController.createEquipo);
router.put('/equipo/:id',equipoController.updateEquipo);
router.delete('/equipo/:id',equipoController.deleteEquipo);


router.post('/equipo/apuesta',equipoController.updateApuesta);
router.post('/registro', usuarioController.registro_usuario);

router.post('/login', usuarioController.login_usuario);

module.exports = router;


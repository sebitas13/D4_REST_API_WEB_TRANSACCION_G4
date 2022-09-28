
const router = require('express').Router();

const equipoController = require('../controllers/equipo');


router.get('/equipo',equipoController.getEquipos);
router.get('/equipo/:id',equipoController.findEquipo);
router.post('/equipo',equipoController.createEquipo);
router.put('/equipo/:id',equipoController.updateEquipo);
router.delete('/equipo/:id',equipoController.deleteEquipo);

module.exports = router;


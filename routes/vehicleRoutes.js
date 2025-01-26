const express = require('express')
const router = express.Router()
const vehiclesController = require('../controllers/vehiclesController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(vehiclesController.getAllVehicles)
    .post(vehiclesController.createNewVehicle)
    .patch(vehiclesController.updateVehicle)
    .delete(vehiclesController.deleteVehicle)

module.exports = router

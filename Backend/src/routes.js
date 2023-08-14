const express = require('express');

const DeliveriesControllers = require('./controllers/DeliveriesControllers')

const routes = express.Router();


routes.post('/deliveries', DeliveriesControllers.STORE)

routes.get('/getdeliveries', DeliveriesControllers.INDEX)

routes.delete('/deldeliveries', DeliveriesControllers.NUKE)




module.exports = routes
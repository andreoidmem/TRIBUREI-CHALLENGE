const express = require('express');

const DeliveriesControllers = require('./controllers/DeliveriesControllers')

const routes = express.Router();

const app = express();

routes.post('/deliveries', DeliveriesControllers.store)

routes.get('/deliveries', DeliveriesControllers.index)

routes.delete('/deliveries', DeliveriesControllers.delete)

app.get('/', (req, res) => { res.send("Olá Mundo") })

app.listen(3001, () => { console.log("Hello server") })



module.exports = routes
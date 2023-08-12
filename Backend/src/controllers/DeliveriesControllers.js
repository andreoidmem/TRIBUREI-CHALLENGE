const Deliveries = require('../models/Deliveries')

module.exports = {

  async index(request, response) {
    const deliveries = await Deliveries.findAll();

    return response.json(deliveries)
  },

  async store(request, response) {
    const {
      nome,
      peso,
      logradouro,
      numero,
      bairro,
      complemento,
      cidade,
      estado,
      pais,
      latitude,
      longitude
    } = request.body

    if (nome === "") return response.status(400)

    const deliveries = await Deliveries.create({
      nome,
      peso,
      logradouro,
      numero,
      bairro,
      complemento,
      cidade,
      estado,
      pais,
      latitude,
      longitude
    })

    return response.json(deliveries)
  },

  async delete(request, response) {

    await Deliveries.destroy({
      where: {},
      truncate: true
    })

    return response.json({
      message: "Os Registros foram deletados"
    })
  }

}
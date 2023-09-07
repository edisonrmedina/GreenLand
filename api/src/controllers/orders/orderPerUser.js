const { Order } = require('../../database/config.js')

const ordenPerUser = async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID must be a valid number' })
  }
  try {
    const orders = await Order.findAll({
      where: { userId: id },
      attributes: {
        exclude: ['userId']
      }
    })
    if (!orders || !orders.length) return res.status(404).json({ error: `Orders with user id: ${id}, not found` })
    res.json(orders)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = ordenPerUser

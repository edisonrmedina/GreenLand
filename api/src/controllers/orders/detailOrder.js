const { DetailOrder, Product } = require('../../database/config.js')

const detailOrder = async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID must be a valid number' })
  }
  try {
    const detailOrder = await DetailOrder.findAll({
      where: { orderId: id },
      include: [{
        model: Product,
        attributes: ['name']
      }],
      attributes: {
        exclude: ['orderId', 'productId']
      }

    })
    if (!detailOrder) return res.status(404).json({ error: `Detail order with order id: ${id}, not found` })
    res.json(detailOrder)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = detailOrder

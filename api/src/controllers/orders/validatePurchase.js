const { Order, DetailOrder } = require('../../database/config.js')
const { Op } = require('sequelize')
const validatePurchase = async (req, res) => {
  const { userId, productId } = req.query
  if (!productId) return res.status(404).json({ error: 'Incomplete required data' })
  try {
    const orders = await Order.findAll({
      where: {
        userId: userId || null
      },
      attributes: ['id']
    })
    const orderIds = orders.map(order => order.id)

    const detailOrders = await DetailOrder.findAll({
      where: {
        orderId: {
          [Op.in]: orderIds || null
        },
        productId
      }
    })
    if (!orders || !orders.length || !detailOrders || !detailOrders.length) return res.status(204).json({ purchase: false })
    res.json({ purchase: true })
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = validatePurchase

const { Order, User, DetailOrder, Product } = require('../../database/config.js')

const allOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{
        model: User,
        attributes: ['id', 'name', 'email']
      }],
      attributes: {
        exclude: ['userId']
      }
    })

    const ordersWithDetails = await Promise.all(orders.map(async (order) => {
      const details = await DetailOrder.findAll({
        where: { orderId: order.id },
        include: [{
          model: Product,
          attributes: ['name']
        }],
        attributes: {
          exclude: ['orderId', 'productId']
        }
      })

      return {
        orden: order,
        detail: details
      }
    }))

    if (!ordersWithDetails || !ordersWithDetails.length) return res.status(404).json({ error: 'Orders not found' })

    res.json(ordersWithDetails)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = allOrders

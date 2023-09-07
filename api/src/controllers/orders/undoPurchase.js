const { Order, User } = require('../../database/config.js')
const { undoPurchaseMail } = require('../../utils/emails.js')

const undoPurchase = async (req, res) => {
  const { userId, orderId, message } = req.body
  if (!userId || !orderId || !message) return res.status(400).json({ error: 'Incomplete required data' })
  try {
    const order = await Order.findOne({
      where: { userId, id: orderId },
      include: [{
        model: User,
        attributes: {
          include: ['id', 'name', 'email']
        }
      }],
      attributes: {
        exclude: ['userId']
      }
    })
    if (!order) return res.status(404).json({ error: 'Order not found' })
    await undoPurchaseMail(order, message)
    res.json({ message: 'Email send successfully' })
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = undoPurchase

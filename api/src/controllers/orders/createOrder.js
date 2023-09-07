const mercadopago = require('mercadopago')
require('dotenv').config()
const { SERVER_URL, CLIENT_URL, PAY_TOKEN } = process.env
const { Product } = require('../../database/config.js')
const createOrder = async (req, res) => {
  const { userId, products } = req.body

  if (!userId || !products) return res.status(400).json({ error: 'Incomplete required data' })

  products.forEach(async (product) => {
    try {
      const productFind = await Product.findOne({ where: { id: product.id } })
      if (!productFind) return res.status(404).json({ error: 'Product not found' })
      if (product.quantity > productFind.stock) return res.status(400).json({ error: `Insufficient stock (${productFind.stock}) of ${productFind.name}` })
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message })
    }
  })

  mercadopago.configure({
    access_token: PAY_TOKEN
  })
  try {
    const result = await mercadopago.preferences.create({
      items: products,
      back_urls: {
        success: `${CLIENT_URL}/shop`,
        failure: `${CLIENT_URL}/shop`,
        pending: `${CLIENT_URL}/shop`
      },
      auto_return: 'approved',
      notification_url: `${SERVER_URL}/orders/webhook`,
      external_reference: userId.toString(),
      binary_mode: true
    })
    res.send(result.body.init_point)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = createOrder

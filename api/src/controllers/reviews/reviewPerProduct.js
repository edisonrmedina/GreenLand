const { Review, User } = require('../../database/config.js')

const reviewPerProduct = async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID must be a valid number' })
  }
  try {
    const review = await Review.findAll({
      where: { productId: id },
      include: [{
        model: User,
        attributes: ['id', 'name', 'image']
      }],
      attributes: {
        exclude: ['productId', 'userId']
      }
    })
    if (!review || !review.length) return res.status(404).json({ error: `Reviews with product id: ${id}, not found` })
    res.json(review)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = reviewPerProduct

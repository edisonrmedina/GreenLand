const { Review, User, Product } = require('../../database/config.js')
const allReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'image']
        },
        {
          model: Product,
          attributes: ['name']
        }
      ],
      order: ['id'],
      attributes: { exclude: ['userId', 'productId'] }
    })
    if (!reviews || !reviews.length) return res.status(404).json({ error: 'Reviews not found' })
    res.json(reviews)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = allReviews

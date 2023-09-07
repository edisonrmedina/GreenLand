const { Review } = require('../../database/config.js')

const newReview = async (req, res) => {
  const { message, rating, userId, productId } = req.body

  try {
    if (!message || !rating || !userId || !productId) return res.status(409).json({ error: 'Incomplete required data' })
    const review = await Review.create({
      message,
      rating,
      userId,
      productId
    })
    if (!review) return res.status(400).json({ error: 'Review creation failed' })
    res.json({ message: 'Product created successfully' })
  } catch (error) {
    return res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = newReview

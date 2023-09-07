const { Review } = require('../../database/config.js')

const deleteReview = async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID must be a valid number' })
  }
  try {
    const review = await Review.destroy({ where: { id } })
    if (!review) return res.status(404).json({ error: `Reviews with id: ${id}, not found` })
    res.json({ message: 'Review successfully deleted' })
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}
module.exports = deleteReview

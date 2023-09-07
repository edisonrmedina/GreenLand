const { Review } = require('../../database/config.js')
const updateReview = async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID must be a valid number' })
  }
  const reviewData = req.body
  try {
    if (!Object.keys(reviewData).length) return res.status(400).json({ error: 'Must send data' })
    const reviewUpdated = await Review.update(reviewData, { where: { id } })
    if (!reviewUpdated) { return res.status(404).json({ error: `User with id: ${id}, not found` }) }
    res.json({ message: `Review with id: ${id} updated successfully` })
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}
module.exports = updateReview

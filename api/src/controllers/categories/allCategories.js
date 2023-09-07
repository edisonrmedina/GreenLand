const { Category } = require('../../database/config.js')

const allCategories = async (req, res) => {
  try {
    const categories = await Category.findAll()
    if (!categories || !categories.length) return res.status(404).json({ error: 'Categories not found' })
    res.json(categories)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = allCategories

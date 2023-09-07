const { User } = require('../../database/config.js')

const deleteUser = async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID must be a valid number' })
  }
  try {
    const product = await User.findByPk(id)
    if (!product) return res.status(404).json({ error: `User with id: ${id}, not found` })
    await product.update({ active: false })
    res.json({ message: 'User successfully inactivated' })
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = deleteUser

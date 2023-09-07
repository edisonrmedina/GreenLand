const { User, Role } = require('../../database/config.js')
const allUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Role],
      attributes: {
        exclude: ['roleId']
      }
    })
    if (!users || !users.length) return res.status(404).json({ error: 'Users not found' })
    res.json(users)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}
module.exports = allUsers

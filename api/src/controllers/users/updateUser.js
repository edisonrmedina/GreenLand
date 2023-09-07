const { User, Role } = require("../../database/config.js")
const bcrypt = require("bcrypt")
const uploadFile = require("../../utils/uploadFile.js")

const updateUser = async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "ID must be a valid number" })
  }
  const userData = req.body
  const image = req.files?.image
  try {
    if (!Object.keys(userData).length && !image)
      return res.status(400).json({ error: "Must send data" })
    if (userData.password) {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(userData.password, saltRounds)
      userData.password = passwordHash
    }
    if (image) {
      const { downloadURL } = await uploadFile(image[0])
      userData.image = downloadURL
    }
    const userUpdated = await User.update(userData, { where: { id } })
    if (!userUpdated) {
      return res.status(404).json({ error: `User with id: ${id}, not found` })
    }
    const user = await User.findOne({
      where: { id },
      include: [Role],
      attributes: {
        exclude: ["roleId"],
      },
    })
    res.json(user)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}
module.exports = updateUser

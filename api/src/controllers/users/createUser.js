const bcrypt = require('bcrypt')
const uploadFile = require('../../utils/uploadFile.js')
const { User } = require('../../database/config.js')
const generateJWT = require('../../utils/jwt.js')
const {
  newUserEmail,
  sendPasswordResetPassword
} = require('../../utils/emails.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { JWT_SECRET } = process.env

const createUser = async (req, res) => {
  const { name, email, password } = req.body
  const image = req.files?.image
  if (!name || !email || !password) { return res.status(400).json({ error: 'Incomplete required data' }) }
  try {
    const user = await User.findOne({ where: { email } })

    if (user && user.origin !== 'greenland') {
      return res
        .status(409)
        .json({ error: `Email registered, Login with ${user.origin}` })
    } else if (user) return res.status(409).json({ error: 'Already registered' })
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    let downloadURL =
      'https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_640.png'
    if (image) {
      const { downloadURL: uploadedDownloadURL } = await uploadFile(image[0])
      downloadURL = uploadedDownloadURL
    }
    const userCreate = await User.create({
      name,
      email,
      image: downloadURL,
      password: passwordHash,
      roleId: 2
    })

    const jwt = await generateJWT(userCreate.id)

    await newUserEmail(userCreate.name, userCreate.email, jwt)

    res.json({ message: 'User created sucessfully' })
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json({ error: error.message })
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Incomplete required data' })
  }
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(404).json({ error: 'User not found' })
    if (user.origin !== 'greenland') {
      return res
        .status(409)
        .json({ error: `Email registered, Login with ${user.origin}` })
    }
    if (user.active === false) {
      return res.status(401).json({ error: 'User inactive' })
    }
    if (user.isVerified === false) {
      return res.status(401).json({ error: 'User not verified' })
    }
    const jwt = await generateJWT(user.id)
    await sendPasswordResetPassword(jwt, user.email, jwt)
    res.json({ message: 'Password reset email sent' })
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json({ error: error.message })
  }
}


const updatePassword = async (req, res) => {
  const { newPassword, confirmNewPassword } = req.body
  let token = req.headers.authorization

  if (!newPassword || !confirmNewPassword) {
    return res.status(400).json({ error: 'Incomplete required data' })
  }

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7)
  }

  const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\]/ // Expresión regular que busca caracteres especiales

  if (
    newPassword !== confirmNewPassword ||
    newPassword.length < 6 ||
    newPassword.length > 20 ||
    !specialCharRegex.test(newPassword)
  ) {
    return res.status(400).json({ error: 'Invalid password' })
  }

  if (!token) return res.status(401).json({ error: 'Invalid token' })

  const { id } = jwt.verify(token, JWT_SECRET)

  if (!id) return res.status(401).json({ error: 'Invalid token' })

  const user = await User.findByPk(id)

  if (!user) return res.status(401).json({ error: 'Invalid token' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(newPassword, saltRounds)

  await user.update({
    password: passwordHash
  })

  res.json({
    message: 'Password updated successfully'
  })
}

module.exports = {
  createUser,
  updatePassword
}

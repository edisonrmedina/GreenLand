const { User, Role } = require('../database/config')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { JWT_SECRET } = process.env
exports.protect = async (req, res, next) => {
  try {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    } else {
      token = req.headers.authorization
    }
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' })
    }

    const { id } = jwt.verify(token, JWT_SECRET)

    const user = await User.findByPk(id)

    if (!user) {
      return res.status(403).json({ error: 'Invalid token' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ error })
  }
}

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const { id } = jwt.verify(token, JWT_SECRET)
      const user = await User.findByPk(id)
      const roleName = await Role.findByPk(user.roleId).then(role => role.name)

      if (!user || !roleName) {
        return res.status(403).json({ error: 'You do not have permission to perform this action' })
      }

      if (!roles.includes(roleName)) {
        return res.status(403).json({
          error: 'You do not have permission to perform this action'
        })
      }
      next()
    } catch (error) {
      return res.status(401).json({ error })
    }
  }
}

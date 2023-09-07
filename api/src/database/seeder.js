const { User, Role, Product, Category, Review, Order, DetailOrder } = require('./config.js')
const bcrypt = require('bcrypt')
const users = require('../utils/mocks/users.json')
const roles = require('../utils/mocks/roles.json')
const products = require('../utils/mocks/products.json')
const categories = require('../utils/mocks/categories.json')
const reviews = require('../utils/mocks/reviews.json')
const orders = require('../utils/mocks/orders.json')
const detailOrder = require('../utils/mocks/detailOrder.json')

const insertData = async (Model, data, name) => {
  if (name === 'usuarios') {
    const saltRounds = 10
    for (const user of data) {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, saltRounds)
      }
    }
  }
  try {
    await Model.bulkCreate(data)
  } catch (error) {
    console.error(`Error al insertar ${name}:, ${error.message}`)
  }
}

const seedDatabase = async () => {
  await insertData(Category, categories, 'categorias')
  await insertData(Product, products, 'productos')
  await insertData(Role, roles, 'roles')
  await insertData(User, users, 'usuarios')
  await insertData(Review, reviews, 'reviews')
  await insertData(Order, orders, 'orders')
  await insertData(DetailOrder, detailOrder, 'detailOrder')
}

module.exports = seedDatabase

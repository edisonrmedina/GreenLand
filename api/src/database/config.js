const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
require('dotenv').config() // Cargar las variables de entorno desde el archivo .env

const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  dialectOptions: process.env.NODE_ENV === 'production'
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {}
})

const basename = path.basename(__filename)

const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '../models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '../models', file)))
  })

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(db))
// Capitalizamos los nombres de los modelos ie: product => Product
const entries = Object.entries(db.models)
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1]
])
db.models = Object.fromEntries(capsEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Product, Order, DetailOrder, Review, Role, Category } = db.models // estos son los modelos que se exportan

User.belongsTo(Role) // Un usuario pertenece a un rol
Role.hasMany(User) // Un rol puede tener varios usuarios

Order.belongsTo(User) // Una orden pertenece a un usuario
User.hasMany(Order) // Un usuario puede tener varias Ordenes

Product.belongsTo(Category) // Un producto pertenece a una categoria
Category.hasMany(Product) // Una categoria puede tener varios productos

Product.belongsToMany(Order, { through: DetailOrder })
Order.belongsToMany(Product, { through: DetailOrder })

DetailOrder.belongsTo(Product)
DetailOrder.belongsTo(Order)

Review.belongsTo(User) // Una review pertenece a un usuario
User.hasMany(Review) // Un usuario puede tener varias reviews

Review.belongsTo(Product) // Una review pertenece a un producto
Product.hasMany(Review) // Un producto puede tener varias reviews

module.exports = {
  ...db.models,
  db
}

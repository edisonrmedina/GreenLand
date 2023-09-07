const { getAllProducts } = require('../../utils/getProduct.js')

const filterProduct = async (req, res) => {
  // Filtrar por categoría si se proporciona
  const filterCriterias = req.body
  try {
    let filteredProducts = await getAllProducts({ active: true })

    // Filtrar por categorias
    if (filterCriterias.categories && filterCriterias.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filterCriterias.categories.includes(product.category.id)
      )
    }

    // Filtrar por nombre si se proporciona
    if (filterCriterias.name) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterCriterias.name.toLowerCase())
      )
    }

    // Filtar por rating de mas de 4 estrellas
    if (filterCriterias.bestSeller) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.dataValues.rating >= 4
      )
    }

    // Filtar por rango de precio
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= parseFloat(filterCriterias.minPrice) &&
        product.price <= parseFloat(filterCriterias.maxPrice)
    )

    // Ordenar productos
    if (filterCriterias.sortBy) {
      if (filterCriterias.sortBy === 'priceLowToHigh') {
        // Filtrar por orden si se proporciona
        filteredProducts.sort((a, b) => a.price - b.price)
      } else if (filterCriterias.sortBy === 'priceHighToLow') {
        filteredProducts.sort((a, b) => b.price - a.price)
      }
    }

    res.json(filteredProducts)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = filterProduct

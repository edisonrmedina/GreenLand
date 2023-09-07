const { Product } = require('../../database/config.js')
const uploadFile = require('../../utils/uploadFile.js')

const updateProduct = async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID must be a valid number' })
  }
  const productData = req.body
  const image = req.files?.image
  try {
    if (!Object.keys(productData).length && !image) return res.status(400).json({ error: 'Must send data' })
    if (image) {
      const { downloadURL } = await uploadFile(image[0])
      productData.image = downloadURL
    }
    const userUpdated = await Product.update(productData, { where: { id } })
    if (!userUpdated) { return res.status(404).json({ error: `User with id: ${id}, not found` }) }
    res.json({ message: `Product with id: ${id} updated successfully` })
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}
module.exports = updateProduct

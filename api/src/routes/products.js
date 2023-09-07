const allProducts = require('../controllers/products/allProducts.js')
const detailProduct = require('../controllers/products/detailProduct.js')
const newProduct = require('../controllers/products/newProduct.js')
const updateProduct = require('../controllers/products/updateProduct.js')
const deleteProduct = require('../controllers/products/deleteProduct.js')
const upload = require('../config/multer.js')
const { protect } = require('../middlewares/auth.js')
const { restrictTo } = require('../middlewares/auth.js')
const { Router } = require('express')
const router = Router()

router.get('/', allProducts)

router.get('/:id', detailProduct)

router.post('/', protect, restrictTo('administrator'), upload.fields([{ name: 'image', maxCount: 1 }]), newProduct)

router.patch('/:id', protect, restrictTo('administrator'), upload.fields([{ name: 'image', maxCount: 1 }]), updateProduct)

router.delete('/:id', protect, restrictTo('administrator'), deleteProduct)

module.exports = router

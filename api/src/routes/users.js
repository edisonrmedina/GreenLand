const { Router } = require('express')
const upload = require('../config/multer.js')
const { loginThirdUser, loginUser, verifyUser } = require('../controllers/users/loginUser.js')
const allUsers = require('../controllers/users/allUsers.js')
const { createUser, forgotPassword, updatePassword } = require('../controllers/users/createUser.js')
const updateUser = require('../controllers/users/updateUser.js')
const deleteUser = require('../controllers/users/deleteUser.js')
const { protect } = require('../middlewares/auth.js')
const { restrictTo } = require('../middlewares/auth.js')
const router = Router()

router.get('/', protect, restrictTo('administrator'), allUsers)
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), createUser)
router.patch('/:id', protect, restrictTo('administrator', 'guest'), upload.fields([{ name: 'image', maxCount: 1 }]), updateUser)
router.delete('/:id', protect, restrictTo('administrator'), deleteUser)
router.post('/login', loginUser)
router.post('/loginThird', loginThirdUser)
router.get('/verify', verifyUser)
router.post('/updatePassword', updatePassword)

// ejemplo
// protect, restrictTo("administrator")

module.exports = router

const express = require('express')
const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/category')
const upload = require('../middleware/upload')

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)

router.get(':id', controller.getByID)

router.delete('/:id', controller.deleteByID)

router.post('/', upload.single('image'), controller.createCategory)

router.patch('/:id', upload.single('image'), controller.updateCategory)


module.exports = router
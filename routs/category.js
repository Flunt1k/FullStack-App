const express = require('express')
const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/category')
const upload = require('../middleware/upload')

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)

router.get(':id', passport.authenticate('jwt', {session: false}), controller.getByID)

router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteByID)

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createCategory)

router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.updateCategory)


module.exports = router
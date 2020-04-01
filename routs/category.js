const express = require('express')
const controller = require('../controllers/category')
const router = express.Router()
const passport = require('passport')

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)

router.get(':id', controller.getByID)

router.delete('/:id', controller.deleteByID)

router.post('/', controller.createCategory)

router.patch('/:id', controller.updateCategory)


module.exports = router
const express = require('express')
const controller = require('../controllers/position')
const router = express.Router()
const passport = require('passport')


router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getByCategoryId)

router.post('/', passport.authenticate('jwt', {session: false}), controller.createPosition)

router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateByID)

router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteByID)


module.exports = router
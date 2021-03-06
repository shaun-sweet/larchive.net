'use strict';''

// Module dependencies
const router = require('express').Router();
const user = require('../app/controllers/user');
const link = require('../app/controllers/link');


router.get('/', user.index);
router.get('/link/new', link.new);
router.post('/link', link.create);
// router.get('/logout', user.logout);
router.get('/login', user.new);
router.post('/login', user.login);
router.get('/delete/link/:id', link.delete);


module.exports = router;

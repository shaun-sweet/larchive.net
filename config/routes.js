'use strict';''

// Module dependencies
const router = require('express').Router();
const user = require('../app/controllers/user');
const link = require('../app/controllers/link');

router.get('/', user.new);

module.exports = router;

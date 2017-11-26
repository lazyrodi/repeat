var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/releasenotes', { title: 'Repeat!' });
});

module.exports = router;

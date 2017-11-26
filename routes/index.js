var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Repeat!' });
});

router.get('/releasenotes', function(req, res, next) {
  res.render('pages/releasenotes', { title: 'Repeat!' });
});

router.get('/case_a_1', function(req, res, next) {
  res.render('pages/case_a_1', { title: 'Repeat!' });
});

module.exports = router;

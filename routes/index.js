var express = require('express');
var router = express.Router();
const exportUser = require('../controller/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/downloadExcel', exportUser);

module.exports = router;

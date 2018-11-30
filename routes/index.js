var express = require('express');
var router = express.Router();
var request = require('./request');

/* GET home page. */
router.get('/', async function(req, res, next) {
  // var banner = (await request.get('/api/getIndexBanner')).body;
  var navigation = (await request.get('/api/getNavigation')).body;
  res.render('index', { title: '精选淘宝天猫优惠卷-小欢有劵', navigation: navigation});
  res.render('index', { title: '精选淘宝天猫优惠卷-小欢有劵'});
});

router.get('/search', async function(req, res, next) {
  console.log(req.query.searchName);
  res.render('search', { title: '搜索 "'+req.query.searchName+'" 的结果', searchName: req.query.searchName});
});

module.exports = router;

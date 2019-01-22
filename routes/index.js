var express = require('express');
var router = express.Router();
var request = require('./request');
var mate = require('./common');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var banner = (await request.get('/api/getIndexBanner')).body;
  var navigation = (await request.get('/api/getNavigation')).body;
  res.render('index', { mate: mate.indexMate, banner: banner, navigation: navigation});
  // res.render('index', { title: '精选淘宝天猫优惠卷-小欢有劵'});
});

router.get('/search', async function(req, res, next) {
  res.render('search', { title: '搜索 "'+req.query.searchName+'" 的结果', searchName: req.query.searchName});
});
router.get('/shopDetail', async function(req, res, next) {
  var detail = (await request.get(`/api/getCommodityDetails?item_id=${req.query.item_id}`)).body;
  console.log(detail);
  if (detail.data[0].small_images) {
    res.render('detail', { title: detail.data[0].title, detail: detail.data[0], simple: detail.data[0].small_images,});
  } else {
    var simple = (await request.get(`/api/taobao/CommodityDetails?num_iid=${req.query.item_id}`)).body;
    res.render('detail', { title: detail.data[0].title, detail: detail.data[0], simple: simple.msg.small_images,});
  }
});
router.get('/babyDetails', async function(req, res, next){
  var detail = (await request.get(`/api/taobao/materialOptional?pageSize=30&pageNum=1&searchName=https://item.taobao.com/item.htm?id=${req.query.id}`)).body;
  var babyInfo = detail.msg.result_list.map_data[0];
  res.render('babyDetails', {title: babyInfo.title, detail: babyInfo, simple: babyInfo.small_images});
})

module.exports = router;

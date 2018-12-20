var request = require('./request');

module.exports = function(app){
  app.get('/admin/index', function(req, res, next) {
    res.render('admin/index', { title: '后台管理' });
  });
  app.get('/admin/nav', function(req, res, next) {
    res.render('admin/nav', { title: '首页导航管理' });
  });
  app.get('/admin/CommodityGrabbing', async function(req, res, next) {
    var Navigation = (await request.get('/api/getNavigation')).body;
    res.render('admin/CommodityGrabbing', { title: '商品更新', Navigation: Navigation,});
  });
  app.get('/admin/updateType', async function(req, res, next) {
    res.render('admin/updateType', { title: '商品更新'});
  });
  app.get('/admin/login', async function(req, res, next) {
    res.render('admin/login', { title: '登录'});
  });
  app.get('/admin/register', async function(req, res, next) {
    res.render('admin/register', { title: '注册'});
  });
  app.get('/admin/orderInquiry', async function(req, res, next) {
    res.render('admin/orderInquiry', { title: '订单查询'});
  });
  app.get('/admin/home', async function(req, res, next) {
    res.render('admin/home', { title: '个人中心'});
  });
}

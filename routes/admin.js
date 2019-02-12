var request = require('./request');

module.exports = function(app){
  app.get('/admin', function(req, res, next) {
    res.render('admin/home', { title: '个人中心' });
  });
  app.get('/admin/index', function(req, res, next) {
    res.render('admin/index', { title: 'banner管理' });
  });
  app.get('/admin/appletBanner', function(req, res, next) {
    res.render('admin/appletBanner', { title: '小程序banner' });
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
    res.render('admin/orderInquiry', { title: '订单信息'});
  });
  app.get('/admin/home', async function(req, res, next) {
    res.render('admin/home', { title: '个人中心'});
  });
  app.get('/admin/Order', function (req, res, next) {
    res.render('admin/Order', {title: '订单明细'})
  });
  app.get('/admin/userManagement', function (req, res, next) {
    res.render('admin/userManagement', {title: '用户管理'});
  });
  app.get('/admin/userInfoEdit', function (req, res, next) {
    res.render('admin/userInfoEdit', {title: '用户修改资料', id: req.query.id, type: req.query.type, pid: req.query.pid});
  });
  app.get('/admin/orderStatusUpdate', function (req, res, next) {
    res.render('admin/orderStatusUpdate', {title: '订单状态更新',});
  });
  app.get('/admin/pidManagement', function (req, res, next) {
    res.render('admin/pid', {title: 'pid管理',});
  });
  app.get('/admin/myfans', function (req, res, next) {
    res.render('admin/myfans', {title: '我的粉丝',});
  });
  app.get('/admin/cashWithdrawal', function (req, res, next) {
    res.render('admin/cashWithdrawal', {title: '提现'});
  });
  app.get('/admin/bindalipay', function (req, res, next) {
    res.render('admin/bindalipay', {title: '绑定支付宝'});
  });
  app.get('/admin/successfulApplication', function (req, res, next) {
    res.render('admin/successfulApplication', {title: '申请成功'});
  });
  app.get('/admin/withdrawalsRecord', function (req, res, next) {
    res.render('admin/withdrawalsRecord', {title: '提现记录'});
  });
  app.get('/admin/setup', function (req, res, next) {
    res.render('admin/setup', {title: '设置'});
  });

}

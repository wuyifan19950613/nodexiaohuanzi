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
}

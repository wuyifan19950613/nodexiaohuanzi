module.exports = function(app){
  app.get('/admin', function(req, res, next) {
    res.render('admin/index', { title: '后台管理' });
  });
  app.get('/admin/nav', function(req, res, next) {
    res.render('admin/nav', { title: '首页导航管理' });
  });
}

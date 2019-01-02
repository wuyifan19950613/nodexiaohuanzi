var request = require('./request');

module.exports = function(app){
  app.get('/wechat/docking', function(req, res, next) {
    res.render('wechat/docking', { title: '微信公众号对接' });
  });
}

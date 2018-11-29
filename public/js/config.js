var config = {
  protocol: 'http',
  host: '192.168.80.16',
  port: 3000,
}
var baseUrl = config.protocol + '://' + config.host + ':' + config.port;


// var config = {
//   protocol: 'http',
//   host: 'api.xiaohuanzi.cn'
// }
// var baseUrl = config.protocol + '://' + config.host;
module.exports = baseUrl;

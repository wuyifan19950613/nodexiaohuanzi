// 家里
// var config = {
//   protocol: 'http',
//   host: '192.168.0.103',
//   port: 3000,
// }
// var baseUrl = config.protocol + '://' + config.host + ':' + config.port;
// 公司
var config = {
  protocol: 'http',
  host: '192.168.80.16',
  port: 3000,
}
var baseUrl = config.protocol + '://' + config.host + ':' + config.port;

// 线上
// var config = {
//   protocol: 'http',
//   host: 'api.xiaohuanzi.cn'
// }
// var baseUrl = config.protocol + '://' + config.host;
module.exports = baseUrl;

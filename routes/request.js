var superagent = require('superagent');
var superagentUse = require('superagent-use');
var baseUrl = require('../public/js/config');

var request = superagentUse(superagent);

request.use(req => {
  req.url = baseUrl + req.url;
  req.on("error", err => {
    var info = JSON.parse(err.response.error.text);
    console.log(info);
  });
})

module.exports = request;

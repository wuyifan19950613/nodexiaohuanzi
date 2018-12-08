// 接口地址
// var devBaseURL = 'http://192.168.0.128:3000';
var devBaseURL = 'http://api.xiaohuanzi.cn';
// var devBaseURL = 'http://192.168.0.103:3000';

var MyMethods = {
  CouponNum: function(v){
    var index = v.indexOf('减');
    var result = parseInt(v.substr(index + 1,v.length));
    return result;
  },
  Infinite: function(cb){
    var laoding = true;
    window.addEventListener('scroll',function(){
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if($(document).scrollTop() + 50 >=$(document).height()-$(window).height() && laoding){
        laoding = false;
        if(cb){
          cb(laoding);
        }
      }
    });
  },
}

$.myGetJSON = function(options) {
  var url = devBaseURL + options.url || '';
  var contentType = options.options || 'application/json;charset=utf-8';
  var data = options.data || '';
  var dataType = options.dataType || 'json';
  $.ajax({
    url: url,
    type: 'GET',
    dataType: dataType,
    data: data,
    contentType: contentType,
    beforeSend: function beforeSend() {
      if (options.beforeSend) options.beforeSend();
    },
    success: function(res) {
      if (options.success) options.success(res);
    },
    error: function(res){
      if (options.error) options.error(res);
    }
  })
};

$.myPostJSON = function(options) {
  var url = devBaseURL + options.url || '';
  var contentType = options.options || 'application/json;charset=utf-8';
  var data = options.data || '';
  var dataType = options.dataType || 'json';
  $.ajax({
    url: url,
    type: 'POST',
    dataType: dataType,
    data: data,
    contentType: contentType,
    success: function(res) {
      if (options.success) options.success(res);
    },
    error: function(res){
      if (options.error) options.error(res);
    }
  })
};
$.myPutJSON = function(options) {
  var url = devBaseURL + options.url || '';
  var contentType = options.options || 'application/json;charset=utf-8';
  var data = options.data || '';
  var dataType = options.dataType || 'json';
  $.ajax({
    url: url,
    type: 'PUT',
    dataType: dataType,
    data: data,
    contentType: contentType,
    success: function(res) {
      if (options.success) options.success(res);
    },
    error: function(res){
      if (options.error) options.error(res);
    }
  })
};
$.myDeleteJSON = function(options) {
  var url = devBaseURL + options.url || '';
  var contentType = options.options || 'application/json;charset=utf-8';
  var data = options.data || '';
  var dataType = options.dataType || 'json';
  $.ajax({
    url: url,
    type: 'DELETE',
    dataType: dataType,
    data: data,
    contentType: contentType,
    success: function(res) {
      if (options.success) options.success(res);
    },
    error: function(res){
      if (options.error) options.error(res);
    }
  })
};

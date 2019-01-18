// 接口地址
// var devBaseURL = 'http://192.168.80.16:3000';
var devBaseURL = 'http://api.xiaohuanzi.cn';
// var devBaseURL = 'http://192.168.0.104:3000';

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
  // 计算当前月份的天数
  days: function(month){
    var days;
    if (month == 2) {
        days = year % 4 == 0 ? 29 : 28;
    }
    else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31;
    }
    else {
        //其他月份，天数为：30.
        days = 30;
    }
    return days;
  },
}

$.myGetJSON = function(options) {
  var url = devBaseURL + options.url || '';
  var contentType = options.options || 'application/json;charset=utf-8';
  var data = options.data || '';
  var dataType = options.dataType || 'json';
  var async = options.async || true;
  var token = '';
  if (Cookie.get('user') && JSON.parse(Cookie.get('user')) !== null) {
    token = JSON.parse(Cookie.get('user')).token;
  }
  $.ajax({
    headers: {
      token: token
    },
    url: url,
    type: 'GET',
    dataType: dataType,
    data: data,
    async: async,
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
  var token = '';
  if (Cookie.get('user') && JSON.parse(Cookie.get('user')) !== null) {
    token = JSON.parse(Cookie.get('user')).token;
  }
  $.ajax({
    headers: {
      token: token
    },
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

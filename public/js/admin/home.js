$.myGetJSON({
  url: '/api/user/info',
  success: function(res){
    Cookie.set('user', JSON.stringify(res.data));
    var userInfo = JSON.parse(Cookie.get('user'));
    if (userInfo.type == 3) {
      $('.user-management').css({display:'block'});
    }
    console.log(userInfo)
    $('.user-info-main .account').html(userInfo.Email);
    $('.user-info-main .code-number').html(userInfo.spread_code);
    $('input[name="userName"]').val(userInfo.userName);
    $('input[name="Rebate"]').val(userInfo.Rebate);
    $('input[name="site_name"]').val(userInfo.site_name);
    $('.balance-money').html(userInfo.amount);
    $('.money.ben').html(userInfo.estimated_revenue_the_month);
    $('.money.last').html(userInfo.estimated_revenue_last_month);
    $('.number-of-fans span').html(userInfo.fans_number);
    var content = $('.user-info-main .code-number').html();
    var clipboard = new ClipboardJS('.copy-code', {
      text: function() {
        return content;
      }
    });
    clipboard.on('success', function(e) {
      layer.open({
        content: '复制成功'
        ,skin: 'msg'
        ,time: 2 //2秒后自动关闭
      });
    });
    clipboard.on('error', function(e) {
      console.log(e);
    });
  }
})

$('.info-save').on('click', function(){
  var userName = $('input[name="userName"]').val();
  var Rebate = $('input[name="Rebate"]').val();
  var site_name = $('input[name="site_name"]').val();
  if (userName == '') {
    layer.open({
      content: '姓名不能为空'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
  } else if (Rebate == '') {
    layer.open({
      content: '返利比例不能为空'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
  } else {
    $.myGetJSON({
      url: '/api/modifyingData?id='+userInfo._id+'&userName='+userName+'&Rebate='+Rebate+'&site_name='+site_name,
      success: function(res){
        layer.open({
          content: '保存成功'
          ,skin: 'msg'
          ,time: 2 //2秒后自动关闭
          ,success: function(){
            Cookie.set('user', JSON.stringify(res.data));
            $('.personal-center .name').html(res.data.userName);
            $('.info-input').hide();
          }
        });
      }
    })
  }
});
$('.modifying').on('click', function(){
  $('.info-input').show();
});
// var adzone_id = userInfo.pid;
// var myDate = new Date();
// var lastYear,
//     lastMonth = myDate.getMonth() - 1;
// var thisYear = myDate.getFullYear();
// var thisMonth = myDate.getMonth() +1;
// if (thisMonth < 10) {
//   thisMonth = '0'+(myDate.getMonth() +1)
// }
// if (thisMonth == 1) {
//   lastYear = thisYear - 1;
//   lastMonth = 12;
// }
// var days = MyMethods.days(thisMonth);
// var lastDays = MyMethods.days(lastMonth);
// var endTime = myDate.getFullYear()+'-'+(thisMonth) +'-'+ days + ' 23:59:59';
// var startTime = myDate.getFullYear()+'-'+(thisMonth) +'-01'+' 00:00:00';
//
//
// var lastStartTime = lastYear +'-'+ lastMonth +'-01'+' 00:00:00';
// var lastEndTime = lastYear +'-'+lastMonth +'-'+ lastDays + ' 23:59:59';
// // settlement('ben', startTime ,endTime, adzone_id, (count)=> {
// //   if (!userInfo.thisMonth) {
// //     userInfo.thisMonth = count;
// //     Cookie.set('user', JSON.stringify(userInfo));
// //   }
// // });
// settlement('last', lastStartTime ,lastEndTime, adzone_id, (count)=> {
//   if (!userInfo.lastMonth) {
//     userInfo.lastMonth = count;
//     Cookie.set('user', JSON.stringify(userInfo));
//   }
// });


// function func(time1,time2){
//   console.log(time1,time2)
//     var time = Date.parse( new Date());
//     var date1 = Date.parse(new Date(time1.replace(/-/g, '/')));
//     var date2 = Date.parse(new Date(time2.replace(/-/g, '/')));
//     if (date1<time&&date2>time) {
//         return true;
//     };
//     return false;
// }

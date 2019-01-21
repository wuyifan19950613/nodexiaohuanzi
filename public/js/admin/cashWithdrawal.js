var myDate = new Date();
if (myDate.getDate() >= 21) {
  $('.application-btn').addClass('active')
} else {
  $('.application-btn').removeClass('active')
}
var userInfo = $.cookie('user');
console.log(userInfo)
$('.user-name').html(userInfo.userName);
$('.alipay-account').html(userInfo.alipayID);
$('.cash-box .balance').html(userInfo.amount);
if (userInfo.alipayID) {
  $('.bind-alipay').hide();
}

$('.bin-active').on('click', function(){
  var user_name = $('.user-name').val();
  var apipay_number = $('.alipay-number').val();
  var phone_number = $('.phone-number').val();
  // var Email = $('.email').val();
  if (user_name == '') {
    layer.open({
      content: '请输入您的真实姓名'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
    return false;
  } else if (apipay_number == '') {
    layer.open({
      content: '请输入您支付宝号'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
    return false;
  } else if (phone_number == '') {
    layer.open({
      content: '请输入您的手机号'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
    return false;
  }
  $.myPostJSON({
    url: '/api/bindAlipay',
    data: JSON.stringify({
      userName: user_name,
      apipayId: apipay_number,
      phone: phone_number,
      // Email: Email,
    }),
    success: function(res){
      $.cookie('user', JSON.stringify(res.data));
      layer.open({
        content: '绑定成功'
        ,skin: 'msg'
        ,time: 2 //2秒后自动关闭
        ,success: function() {
          setTimeout(()=> {
            window.location.href=document.referrer;
          },2000)
        }
      });
    }
  })
})
$('.apply-btn.active').on('click', function(){
  var balance = Number($('.cash-box .balance').html())
  var wantbalance = $('.cash-box input[type="number"]').val();
  var apipayId = $('.alipay-account').html();
  var userName = $('.user-name').html();
  if (userName == '') {
    layer.open({
      content: '请先绑定支付宝'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
    return false;
  } else if (wantbalance > balance) {
    layer.open({
      content: '金额已超过提现余额'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
    return false;
  } else if (wantbalance < 1) {
    layer.open({
      content: '最低提现金额为1元'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
    return false;
  }
  $.myPostJSON({
    url: '/api/cashWithdrawalApplication',
    data: JSON.stringify({
      userName: userName,
      alipayID: apipayId,
      amount: wantbalance,
    }),
    success: function(msg){
      if (msg.code == 200) {
        var userInfo = JSON.parse($.cookie('user'));
        userInfo.amount = msg.data.amount;
        $.cookie('user', JSON.stringify(userInfo));
        window.location.href = '/admin/successfulApplication';
      }
    }
  })
})

// $('.cash-input .cash-box input').bind('focus',function(){
//     // $('.withdrawals-record').css('position','static');
//     $('.fans-main').height($(window).height()+'px');
//     $('.withdrawals-record').css({'position':'absolute','bottom':'.2rem'});
// }).bind('blur',function(){
//     $('.withdrawals-record').css({'position':'fixed','bottom':'.2rem'});
// });

$('.login-btn').on('click', function(){
  var Email = $('input[name="account"]').val();
  var password = $('input[name="password"]').val();
  if (Email == '') {
    layer.open({
      content: '请输入账号'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
    return false;
  } else if (password == '') {
    layer.open({
      content: '请输入密码'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
    return false;
  } else {
    $.myPostJSON({
      url: '/api/user/login',
      data: JSON.stringify({Email: Email, password: password}),
      success: function(res){
        console.log(res);
        if (res.code == 201) {
          layer.open({
            content: res.message
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
          });
        } else {
          Cookie.set('user', JSON.stringify(res.userInfo));
          layer.open({
            content: res.message
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
            ,success: function(){
              setTimeout(function(){
                window.location.href = '/admin/home';
              },2000)
            }
          });

        }
      }
    })
  }
});
$('.register-btn').on('click', function(){
  var userName = $('input[name="account"]').val();
  var password = $('input[name="password"]').val();
  var code = $('input[name="code"]').val();
  if (userName == '') {
    layer.open({
      content: '请输入账号'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
    return false;
  } else if (password == '') {
    layer.open({
      content: '请输入密码'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
    return false;
  } else {
    $.myPostJSON({
      url: '/api/user/register',
      data: JSON.stringify({userName: userName, password: password,promoCode: code}),
      success: function(res){
        console.log(res);
        if (res.code == 202) {
          layer.open({
            content: res.message
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
          });
        } else {
          layer.open({
            content: res.message
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
            ,success: function(){
              setTimeout(()=> {
                window.location.href = '/admin/login';
              },2000)
            }
          });
        }
      }
    })
  }
})

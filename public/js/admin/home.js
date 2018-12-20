var userInfo = JSON.parse(mystorage.get('user'));
console.log(userInfo)
$('.personal-center .name').html(userInfo.userName);
$('input[name="userName"]').val(userInfo.userName);
$('input[name="Rebate"]').val(userInfo.Rebate);
$('input[name="site_name"]').val(userInfo.site_name);

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
            mystorage.set('user', JSON.stringify(res.data));
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

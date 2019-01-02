var userInfo = JSON.parse(Cookie.get('user'));
console.log(userInfo);
if (userInfo.type == 2) {
  $('.user-management').show();
}
$('.userInfo .name').html(userInfo.userName);
$('.userInfo .id span').html(userInfo.pid);
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
var adzone_id = userInfo.pid;
var myDate = new Date();
var lastYear,
    lastMonth = myDate.getMonth() - 1;
var thisYear = myDate.getFullYear();
var thisMonth = myDate.getMonth() +1;
if (thisMonth < 10) {
  thisMonth = '0'+(myDate.getMonth() +1)
}
if (thisMonth == 1) {
  lastYear = thisYear - 1;
  lastMonth = 12;
}
var days = MyMethods.days(thisMonth);
var lastDays = MyMethods.days(lastMonth);
var endTime = myDate.getFullYear()+'-'+(thisMonth) +'-'+ days + ' 23:59:59';
var startTime = myDate.getFullYear()+'-'+(thisMonth) +'-01'+' 00:00:00';


var lastStartTime = lastYear +'-'+ lastMonth +'-01'+' 00:00:00';
var lastEndTime = lastYear +'-'+lastMonth +'-'+ lastDays + ' 23:59:59';
settlement('ben', startTime ,endTime, adzone_id);
settlement('last', lastStartTime ,lastEndTime, adzone_id);
function settlement(dome, startTime, endTime, adzone_id){
  $.myGetJSON({
    url: '/api/settlement?startTime='+startTime+'&endTime='+endTime+'&adzone_id='+adzone_id,
    success: function (msg) {
      var count = 0;
      for (var i = 0; i < msg.data.length; i++) {
        if (msg.data[i].tk_status == 3) {
          count = count + parseFloat(msg.data[i].pub_share_pre_fee);
        }
      }
      $('.'+dome+'').html(count)
    }
  })
}

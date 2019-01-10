$.myGetJSON({
  url:'/api/user/withdrawalsRecord',
  success: function(res){
    console.log(res);
    var html = '';
    for (var i = 0; i< res.data.length; i++) {
      html +='<li class="time-axis-li flex">';
      html +='<div class="left">';
      html +=''+(res.data[i].creatio_time).substring(0,10)+'<br />'+(res.data[i].creatio_time).substring(11,19);
      if (res.data[i].status == 0) {
        html +='<b class="dot chuli"></b></div>';
      } else if (res.data[i].status == 1) {
        html +='<b class="dot arrival-account"></b></div>';
      }
      html +='<div class="right">';
      html +='转账到：'+res.data[i].alipayID;
      html +='<b>';
      html +='<div class="amount">-'+res.data[i].amount+'</div>';
      if (res.data[i].status == 0) {
        html +='<div class="tips chuli">处理中</div>';
      } else if (res.data[i].status == 1) {
        html +='<div class="tips arrival-account">付款成功</div>';
      }
      html +='</b>';
      html +='</div>';
      html +='</li>';
    }
    $('.time-axis').html(html);
  }
})

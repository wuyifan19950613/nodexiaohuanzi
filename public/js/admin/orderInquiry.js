$('.search-btn').on('click', function(){
  var orderCode = $('input[name="orderCode"]').val();
  $.myGetJSON({
    url: '/api/orderInquiry?trade_id='+orderCode,
    success: function(res){
      var html = '';
      for (var i = 0; i < res.data.length; i++) {
        var orderStatus = '';
        if (res.data[i].tk_status == 3) {
          orderStatus = '订单结算';
        } else if (res.data[i].tk_status == 14) {
          orderStatus = '订单成功';
        } else if (res.data[i].tk_status == 13) {
          orderStatus = '订单失效';
        } else if (res.data[i].tk_status == 12) {
          orderStatus = '订单付款';
        }
        html+= '<tr>';
        html+= '<td>'+res.data[i].create_time+'</td>';
        html+= '<td>'+res.data[i].item_title+'</td>';
        html+= '<td>'+orderStatus+'</td>';
        html+= '<td>'+res.data[i].pay_price+'</td>';
        html+= '<td>'+res.data[i].pub_share_pre_fee+'</td>';
        html+= '</tr>';
      }

      $('.order-table tr').after(html);
    }
  })
});

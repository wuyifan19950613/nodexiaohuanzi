function order_pic(num_iid, cb, single_baby) {
    var pict_url = '';
    $.myGetJSON({
      url: '/api/getCommodityDetails?item_id=' + num_iid,
      success: function (msg) {
        if (msg.data.length == 0) {
          pict_url =  '/';
        } else {
          pict_url = msg.data[0].pict_url;
        }
        if (cb) {
          cb(pict_url, single_baby)
        }
      }
    })
}
  $.myGetJSON({
    url: '/api/orderInquiry',
    success: function(res){
      if(res.data.length >= 0){
        var html = '';
        for( var i = 0; i < res.data.length; i ++){
          var single_baby = {};
          single_baby.title = res.data[i].item_title;                                                // 商品名称
          single_baby.seller_shop_title = res.data[i].seller_shop_title;                             // 店铺名称
          single_baby.pub_share_pre_fee = res.data[i].pub_share_pre_fee;                             // 预估收入
          single_baby.trade_id = res.data[i].trade_id;                                               // 订单id
          single_baby.tk_status = res.data[i].tk_status;                                             //订单状态
          single_baby.price = res.data[i].price;                                                     //宝贝原价
          single_baby.alipay_total_price = res.data[i].alipay_total_price;                           // 实际付款金额
          single_baby.num_iid = res.data[i].num_iid;                                                 // 商品id
          single_baby.create_time = res.data[i].create_time;                                         // 商品创建时间
          html += '<li>';
          html += '<div class="order-top">';
          // html += '<img class="pict_url" src="'+order_pic(res.data[i].num_iid)+'" alt="">';
          html += '<div class="order-info">';
          html += '<h6>'+res.data[i].item_title+'</h6>';
          html += '<p class="shop-title">所属店铺：'+res.data[i].seller_shop_title+'</p>';
          if (res.data[i].tk_status == 12) {
            html += '<b class="pay-tip">已付款</b>';
          } else if (res.data[i].tk_status == 13) {
            html += '<b class="pay-tip red">订单失效</b>';
          } else if (res.data[i].tk_status == 3) {
            html += '<b class="pay-tip active">已结算</b>';
          }
          html += '<div class="money-main">';
          html += '<span class="money-title">付款金额：</span>';
          var pay = res.data[i].alipay_total_price;
          html += '<span class="money">￥'+parseFloat(pay).toFixed(2)+'</span>';
          html += '</div></div></div>';
          html += '<div class="order-bottom">';
          html += '<div class="">创建：'+res.data[i].create_time+'</div>';
          html += '<div class="income">付款预估收入：<span>￥'+res.data[i].pub_share_pre_fee+'</span></div>';
          html += '</div>';
          if (i % 2 == 1) {
            html += '<img class="snow1" src="/images/snow.png" alt="">';
          } else {
            html += '<img class="snow1" src="/images/icon-snowman.png" alt="">';
          }
          html += '</li>'
        }
        $('.order-list').html(html);
      }
    }
  })

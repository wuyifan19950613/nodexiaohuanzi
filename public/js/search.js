var ShopPageNum = 1;
var laoding = true;
searchList(ShopPageNum);
function searchList(pageNum){
  $.myGetJSON({
    url:'/api/taobao/materialOptional?searchName='+searchName+'&pageSize=30&pageNum='+pageNum,
    success: function(res){
      console.log(res);
      commlist = res.msg.result_list.map_data;
      var html = '';
      for(var i= 0; i<commlist.length;i++){
        html+='<li class="">';
        html+='<a href="'+(commlist[i].coupon_share_url? commlist[i].coupon_share_url: commlist[i].url)+'">';
        html+='<div class="img-url">';
        html+='<img src="'+commlist[i].pict_url+'" data-original="'+commlist[i].pict_url+'" alt="">';
        html+='</div>';
        html+='<div class="commodity">';
        html+='<h1 class="commodity-title">'+commlist[i].title+'</h1>';
        html+='<div class="price">';
        html+='<span class="sale-price">￥<b>'+(commlist[i].zk_final_price - (commlist[i].coupon_info == '' ? 0 : MyMethods.CouponNum(commlist[i].coupon_info))).toFixed(2)+'</b></span>';
        if (commlist[i].coupon_info != '') {
          html+='<span class="market-price">¥'+commlist[i].zk_final_price+'</span>';
        }
        html+='</div>';
        html+='<div>';
        if(commlist[i].coupon_info !== '' || commlist[i].coupon_info == '0') {
          html+='<div class="used-coupon">  劵：'+(commlist[i].coupon_info == '' ? 0 : MyMethods.CouponNum(commlist[i].coupon_info))+'元</div>';
        }
        html+='<div class="used-envelope">返：'+Math.floor((Math.floor((commlist[i].commission_rate / 100).toFixed(2) * (commlist[i].zk_final_price - (commlist[i].coupon_info == '' ? 0 : MyMethods.CouponNum(commlist[i].coupon_info)))) / 100) * 0.7 * 100) / 100+'元</div>'
        html+='</div>';
        html+='</div>';
        html+='</a></li>';
      }
      $('.recommend-list').append(html);
      $("img").lazyload({effect: "fadeIn"});
    }
  });
}

window.addEventListener('scroll',function(){
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  if($(document).scrollTop() + 50 >=$(document).height()-$(window).height() && laoding){
    laoding = false;
    ShopPageNum ++;
    $.myGetJSON({
      url:'/api/taobao/materialOptional?searchName='+searchName+'&pageSize=30&pageNum='+ShopPageNum,
      success: function(res){
        console.log(res);
        commlist = res.msg.result_list.map_data;
        var html = '';
        for(var i= 0; i<commlist.length;i++){
          html+='<li class="">';
          html+='<a href="'+(commlist[i].coupon_share_url? commlist[i].coupon_share_url: commlist[i].url)+'">';
          html+='<div class="img-url">';
          html+='<img src="'+commlist[i].pict_url+'" data-original="'+commlist[i].pict_url+'" alt="">';
          html+='</div>';
          html+='<div class="commodity">';
          html+='<h1 class="commodity-title">'+commlist[i].title+'</h1>';
          html+='<div class="price">';
          html+='<span class="sale-price">￥<b>'+(commlist[i].zk_final_price - (commlist[i].coupon_info == '' ? 0 : MyMethods.CouponNum(commlist[i].coupon_info))).toFixed(2)+'</b></span>';
          if (commlist[i].coupon_info != '') {
            html+='<span class="market-price">¥'+commlist[i].zk_final_price+'</span>';
          }
          html+='</div>';
          html+='<div>';
          if(commlist[i].coupon_info !== '' || commlist[i].coupon_info == '0') {
            html+='<div class="used-coupon">  劵：'+(commlist[i].coupon_info == '' ? 0 : MyMethods.CouponNum(commlist[i].coupon_info))+'元</div>';
          }
          html+='<div class="used-envelope">返：'+Math.floor((Math.floor((commlist[i].commission_rate / 100).toFixed(2) * (commlist[i].zk_final_price - (commlist[i].coupon_info == '' ? 0 : MyMethods.CouponNum(commlist[i].coupon_info)))) / 100) * 0.7 * 100) / 100+'元</div>'
          html+='</div>';
          html+='</div>';
          html+='</a></li>';
        }
        $('.recommend-list').append(html);
        laoding = true;
      }
    });
  }
});

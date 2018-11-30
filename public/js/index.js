var navbackColor = [
  '#a4d6d3',
  '#f64450',
  '#f53f65',
  '#a331df',
  '#cb7dff',
  '#ff656b',
  '#ffd10a',
  '#e6569e',
];
var ShopPageNum = 1;

var mySwiper = new Swiper ('.index-banner', {
  autoplay: {
    delay: 3000,//1秒切换一次
    disableOnInteraction: false,
  },
  loop : true,
  pagination: {
    el: '.index-banner .swiper-pagination',
  },
  on: {
    slideChangeTransitionStart: function(){
      $('.search-box').css({background:navbackColor[this.realIndex]});
    },
  },
});
$('.nav-slide').eq(0).addClass('active');
shopList(0,1);
// 导航
var navigation = new Swiper ('.navigation-swiper', {
    slidesPerView : 'auto',
    on:{
       tap:() => {
         ShopPageNum = 1;
        let nowTlanslate;
        const swiper = navigation;
        const swiperWidth = swiper.$el[0].clientWidth;
        const width = swiperWidth / 2;
        const maxTranslate = swiper.maxTranslate();
        const maxWidth = -maxTranslate + width;
        const clickIndex = swiper.clickedIndex;
        const slide = swiper.slides[clickIndex];
        const slideLeft = slide.offsetLeft;
        const slideWidth = slide.clientWidth;
        const halfSlideWidth = slideWidth / 2;
        const slideCenter = slideLeft + halfSlideWidth;
        const offsetTop = swiper.$el[0].offsetTop;
        swiper.setTransition(500);
        if (slideCenter < swiperWidth / 2) {
         swiper.setTranslate(0);
        } else if (slideCenter > maxWidth) {
         swiper.setTranslate(maxTranslate);
        } else {
         nowTlanslate = slideCenter - width;
         swiper.setTranslate(-nowTlanslate);
        }
        $('.nav-slide').eq(clickIndex).addClass('active').siblings().removeClass('active');
        shopList(clickIndex,1);
       },
     },
});


function shopList(i,pageNum,laoding){
  var commlist = new Array();
  $.myGetJSON({
    url:'/api/taobao/optimusMaterial?pageNum='+pageNum+'&pageSize=30&material_id='+$('.nav-slide').eq(i).attr('data-material_id'),
    success: function(res){
      commlist = res.msg.result_list.map_data;
      var html = '';
      for(var i= 0; i<commlist.length;i++){
        html+='<li class="">';
        html+='<a href="'+commlist[i].coupon_click_url+'">';
        html+='<div class="img-url">';
        html+='<img src="'+commlist[i].pict_url+'" alt="">';
        html+='</div>';
        html+='<div class="commodity">';
        html+='<h1 class="commodity-title">'+commlist[i].title+'</h1>';
        html+='<div class="price">';
        html+='<span class="sale-price">￥<b>'+(commlist[i].zk_final_price - commlist[i].coupon_amount).toFixed(2)+'</b></span>';
        html+='<span class="market-price">¥'+commlist[i].zk_final_price+'</span>';
        html+='</div>';
        html+='<div class="used-coupon">  劵 '+commlist[i].coupon_amount+'元</div>';
        html+='</div>';
        html+='</a></li>';
      }
      laoding = true;
      $('.recommend-list').html(html);
    }
  })
}
$('#keyword').on('keypress', function(e){
  var keycode = e.keyCode;
  var searchName = $(this).val();
  if(keycode=='13') {
    $.myGetJSON({
      url:'/api/taobao/materialOptional?pageSize=30&pageNum=1&searchName='+searchName,
      success: function(res){
        window.location.href = "/search?searchName="+searchName;
      }
    })
  }
});


var laoding = true;
window.addEventListener('scroll',function(){
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  if($(document).scrollTop() + 50 >=$(document).height()-$(window).height() && laoding){
    laoding = false;
    var index = $('.navigation-swiper .swiper-slide.active').index();
    ShopPageNum ++;
    var commlist = new Array();
    $.myGetJSON({
      url:'/api/taobao/optimusMaterial?pageNum='+ShopPageNum+'&pageSize=30&material_id='+$('.nav-slide').eq(index).attr('data-material_id'),
      success: function(res){
        commlist = res.msg.result_list.map_data;
        var html = '';
        for(var i= 0; i<commlist.length;i++){
          html+='<li class="">';
          html+='<a href="'+commlist[i].coupon_click_url+'">';
          html+='<div class="img-url">';
          html+='<img src="'+commlist[i].pict_url+'" alt="">';
          html+='</div>';
          html+='<div class="commodity">';
          html+='<h1 class="commodity-title">'+commlist[i].title+'</h1>';
          html+='<div class="price">';
          html+='<span class="sale-price">￥<b>'+(commlist[i].zk_final_price - commlist[i].coupon_amount).toFixed(2)+'</b></span>';
          html+='<span class="market-price">¥'+commlist[i].zk_final_price+'</span>';
          html+='</div>';
          html+='<div class="used-coupon">  劵 '+commlist[i].coupon_amount+'元</div>';
          html+='</div>';
          html+='</a></li>';
        }
        laoding = true;
        $('.recommend-list').append(html);
      }
    })
  }
});

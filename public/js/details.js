var mySwiper = new Swiper('.details-swiper', {
	autoplay: true,//可选选项，自动滑动
})
$.myGetJSON({
	url:'/api/taobao/pwdCreate',
	data: infoData,
	success: function(res){
		const model = res.msg.data.model;
		$('.password-text').html(model);
		var content = $(".password-text").html();
		var clipboard = new ClipboardJS('.purchase', {
			text: function() {
				return content;
			}
		});
		clipboard.on('success', function(e) {
			layer.open({
				content: '复制成功，请打开手机淘宝'
				,skin: 'msg'
				,time: 2 //2秒后自动关闭
			});
		});
		clipboard.on('error', function(e) {
			console.log(e);
		});
	}
});

$.myGetJSON({
	url: '/api/taobao/recommend?num_iid='+infoData.num_iid,
	success: function(res){
		if (res.data.results) {
			$('.recommended').show();
			var commlist = res.data.results.n_tbk_item;
			var html = '';
			for(var i= 0; i<commlist.length;i++){
				html+='<li class="">';
				html+='<a href="/babyDetails?id='+commlist[i].num_iid+'">';
				html+='<div class="img-url">';
				html+='<img src="'+commlist[i].pict_url+'" data-original="'+commlist[i].pict_url+'" alt="">';
				html+='</div>';
				html+='<div class="commodity">';
				html+='<h1 class="commodity-title">'+commlist[i].title+'</h1>';
				html+='<div class="price">';
				html+='<span class="sale-price">￥<b>'+(commlist[i].zk_final_price)+'</b></span>';
				html+='<span class="volume">已售'+commlist[i].volume+'</span>'
				html+='</div>';
				html+='</div>';
				html+='</a></li>';
			}
			$('.recommend-list').html(html);
			$("img").lazyload({effect: "fadeIn"});
		}
	}
})

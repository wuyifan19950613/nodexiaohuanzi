var mySwiper = new Swiper('.details-swiper', {
	autoplay: true,//可选选项，自动滑动
	pagination: {
		el: '.swiper-pagination',
	},
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

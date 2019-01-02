$('.search-btn').on('click', function(){
  var id = $('.order-status div.active').attr('data-id');
  $.myPutJSON({
    url: '/api/orderStatusUpdate',
    data: JSON.stringify({
      settle_time: $('.order-search input').val(),
      status: id,
    }),
    success: function(res){
      console.log(res);
    }
  })
});
$('.order-status div').on('click', function(){
  $(this).addClass('active').siblings().removeClass('active')
})

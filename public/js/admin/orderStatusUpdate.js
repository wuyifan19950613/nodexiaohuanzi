$('.search-btn').on('click', function(){
  $.myPutJSON({
    url: '/api/orderStatusUpdate',
    data: JSON.stringify({
      settle_time: $('.order-search input').val(),
    }),
    success: function(res){
      console.log(res);
    }
  })
});

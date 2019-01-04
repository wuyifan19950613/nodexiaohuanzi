$('.search-btn').on('click', function(){
  var pid = $('.order-search input').val();
  $.myPostJSON({
    url: '/api/addpid',
    data: JSON.stringify({
      pid: pid,
    }),
    success: function(res){
      console.log(res);
    }
  })
})

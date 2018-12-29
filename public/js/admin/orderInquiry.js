formData('1')
function formData(i) {
  $.myGetJSON({
    url: '/api/orderInquiry?tk_status='+i,
    success: function(res){
      console.log(res);
    }
  })
}

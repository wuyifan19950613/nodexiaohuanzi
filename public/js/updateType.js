var count = 0;
var nowCount = 0;
$('.update-btn').on('click', function(){
  var searchName = $('.input-base').val();
  var pageNum = 1;
  PostUpdateType(searchName, pageNum);
});
function PostUpdateType(searchName, pageNum){
  $.myGetJSON({
    url:'/api/taobao/materialOptional?pageSize=100&pageNum='+pageNum+'&searchName='+searchName,
    success: function(res){
      var map_data = res.msg.result_list.map_data;
      count = res.msg.total_results;
      for(var i = 0; i<map_data.length; i++){
        var num_iid = map_data[i].num_iid;
        var coupon_info = map_data[i].coupon_info;
        var coupon_share_url = map_data[i].coupon_share_url;
        delete(map_data[i].num_iid);
        delete(map_data[i].coupon_info);
        delete(map_data[i].coupon_share_url);
        map_data[i].item_id = num_iid;
        map_data[i].coupon_click_url = coupon_share_url;
        map_data[i].coupon_amount = CouponNum(coupon_info);
      }
      nowCount = parseInt(nowCount) + parseInt(map_data.length);
      console.log('总数据'+count+',已更新'+nowCount);
      $.myPostJSON({
        url: '/api/updateType',
        data: JSON.stringify(map_data),
        success: function(data){
          if(nowCount < count) {
            pageNum ++;
            PostUpdateType(searchName, pageNum)
          } else {
            layer.open({
              content: `更新了${nowCount}条数据`
              ,skin: 'msg'
              ,time: 2 //2秒后自动关闭
            });
            count = 0;
            nowCount = 0;
          }
        }
      })
    }
  })
}
function CouponNum(v){
  const index = v.indexOf('减');
  const result = parseInt(v.substr(index + 1,v.length));
  return result;
}

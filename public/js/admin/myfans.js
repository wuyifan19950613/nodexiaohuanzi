$.myGetJSON({
  url: '/api/queryFans',
  success: function(res){
    console.log(res);
    var html = '';
    for (var i = 0; i < res.data.length; i++) {
      html += '<li class="fans flex">';
      html += '<img class="fans-pic" src="" alt="">';
      html += '<div class="fans-info">';
      html += '<h3 class="fans-name">'+res.data[i].userName+'</h3>';
      html += '<p class="fans-reamrk">1231231</p>';
      html += '</div>';
      html += '</li>';
    }
    $('.myfans-lists').html(html)
  }
})

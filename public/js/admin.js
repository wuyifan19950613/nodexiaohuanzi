$.myGetJSON({
  url: '/api/getIndexBanner',
  success: function(res){
    var html = '';
    for(var i=0; i<res.data.length;i++){
      html+='<tr>';
      html+='<td>'+res.data[i].imgMark+'</td>';
      html+='<td>'+res.data[i].imgUrl+'</td>';
      html+='<td>'+res.data[i].imgHref+'</td>';
      html+='<td><div class="delete-banner delete" data-id="'+res.data[i]._id+'">删除</div></td>';
      html+='</tr>';
    }
    $('.banne-list tr').after(html);
  },
});

$.myGetJSON({
  url: '/api/getNavigation',
  success: function(res){
    var html = '';
    for(var i=0; i<res.data.length;i++){
      html+='<tr>';
      html+='<td>'+res.data[i].title+'</td>';
      html+='<td>'+res.data[i].navId+'</td>';
      html+='<td><div class="delete-nav delete" data-id="'+res.data[i]._id+'">删除</div></td>';
      html+='</tr>';
    }
    $('.nav-list tr').after(html);
  },
});

$('body').on('click', '.delete-banner', function(){
  var id = $(this).attr('data-id');
  $.myDeleteJSON({
    url:'/api/removeIndexBanner?id='+id,
    success: function(res){
      console.log(res);
    }
  })
});
$('body').on('click', '.delete-nav', function(){
  var id = $(this).attr('data-id');
  $.myDeleteJSON({
    url:'/api/removeNavigation?id='+id,
    success: function(res){
      console.log(res);
    }
  })
});

$('#bannerAdd').on('click', function(){
  var imgUrl = $('.img-url').val();
  var imgHref = $('.img-href').val();
  var imgMark = $('.img-mark').val();
  $.myPostJSON({
    url:'/api/addIndexBanner',
    data: JSON.stringify({
      imgUrl: imgUrl,
      imgHref: imgHref,
      imgMark: imgMark,
    }),
    success: function(res){
      $('.img-url').val('');
      $('.img-href').val('');
      $('.img-mark').val('');
    }
  })
});

$('#navAdd').on('click', function(){
  var navName = $('.navName').val();
  var navId = $('.navId').val();
  $.myPostJSON({
    url:'/api/addNavigation',
    data: JSON.stringify({
      title: navName,
      navId: navId,
    }),
    success: function(res){
      $('.navId').val('');
      $('.navName').val('');
    }
  })
});
$('.update-commodity').on('click', function(){
  var id = $(this).attr('data-id');
  var page_no = $(this).parent().siblings().find('.page-no').val();
  if(page_no == ''){
    layer.open({
      content: '请输入页数'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
    return false;
  }
  $.myGetJSON({
    url:'/api/getUpdateCommdity?material_id='+id+'&page_no='+page_no,
    success: function(res){
      layer.open({
        content: res.msg
        ,skin: 'msg'
        ,time: 2 //2秒后自动关闭
      });
    }
  })
})

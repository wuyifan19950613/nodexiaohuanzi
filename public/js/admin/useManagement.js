$.myGetJSON({
  url: '/api/userAll',
  success: function(res){
    // res.data
    console.log(res);
    var html = '';
    for (var i = 0; i< res.data.length; i++) {
      html+='<tr>';
      html+='<td>'+res.data[i].userName+'</td>';
      html+='<td>'+res.data[i].type+'</td>';
      html+='<td>'+res.data[i].pid+'</td>';
      html+='<td data-id="'+res.data[i]._id+'"><a href="/admin/userInfoEdit?id='+res.data[i]._id+'&type='+res.data[i].type+'&pid='+res.data[i].pid+'">编辑</a></td>';
      html+='</tr>';
    }
    $('.user-table tr').after(html);
  }
});

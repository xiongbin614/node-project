
$(function(){

    clickPage();
    delet();
    alter();
    addBanner();
    // $('.alter')[0].click(function(){
    //     alert(5)
    // })
    // getData(pageNum, pageSize)第一个多少页，第二个是一页有多少条
    // 添加banner数据
    function addBanner(){
        $("#bannerAdd").click(function () {
            // 发送ajax请求数据到后台
            $.post('/banner/add', {
                vdName: $('#inputEmail3').val(),
                imgName: $('#inputPassword3').val()
            }, function (res) {
                if (res.code === 0) {
                    // 成功
                    layer.msg('提交成功');
                    console.log('提交成功');
                } else {
                    // 失败
                    console.log(res.message);
                    alert("网络异常，请稍后再试！！")
                }
                $('#myModal').modal('hide');
                $('#inputEmail3').val('');
                $('#inputPassword3').val('');
            })
        });
    }
    
});
// 发送ajax渲染页面
function getData(pageNum, pageSize){
    $.get('/banner/get',{
        pageNum: pageNum,
        pageSize: pageSize
    },
    function(res){
        if (res.code===0){//  chengghuoqu
            for (var i = 0; i < res.data.length;i++){
               $('.xb-show tbody').append(
            `
            <tr>
                            <td>${res.data[i]._id}</td>
                            <td>${res.data[i].name}</td>
                            <td><img src="${res.data[i].imgUrl}" alt=""></td>
                            <td><a href="javascript:;" class="delet">删除</a><a href="javascript:;" class="alter" >修改</a></td>
                        </tr>
            `
        )  
            };
        }else{//获取失败
            console.log(result.msg);
            // layer.msg('网络异常，请稍后重试');
        }
        
    })
};
// 点击切换页面
function clickPage(fn){
    getData(1, 2);
    for(var i=0;i<$('.page').length;i++){
        $('.page').eq(i).click(function () {
            $(this).addClass('active').siblings().removeClass('active');
           let page=parseInt($(this).find('a').html());
            $('.xb-show tbody').html('');
            getData(page, 2);
            
        })
    }
}
// 修改
function alter(){
    $(".xb-show tbody").delegate(".alter", "click", function (event) {
            var target = $(event.target);
             //获取当前的名字、图片
          let imgUrl = target.parent().prev().find('img').attr('src');
          let name= target.parent().prev().prev().html();
       
        });
}
// 删除一条banner数据
function delet(){
    $(function () {
        $(".xb-show tbody").delegate(".delet", "click", function (event) {
            layer.confirm('是否要删除?', function (index) {
                var target = $(event.target);
                target.parent().parent().remove();
                $.get('/banner/remove', {
                    name: target.parent().prev().prev().html()
                }, function (res) {
                    if (res.code === 0) {
                        layer.msg('删除成功');
                    } else {
                        layer.msg('网络异常，请稍后再试');
                    }
                })
                layer.close(index);
            });  
   
      
              
           
        })
    })
}
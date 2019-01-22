
$(function(){
    getData(1, 5);

    clickPage();
    // getData(pageNum, pageSize)第一个多少页，第二个是一页有多少条
    $("#bannerAdd").click(function () {
        // 发送ajax请求数据到后台
        $.post('/banner/add',{
            vdName: $('#inputEmail3').val(),
            imgName: $('#inputPassword3').val()
        },function(res){
            if(res.code===0){
                // 成功
                layer.msg('提交成功'); 
                console.log('提交成功');
            }else{
                // 失败
                console.log(res.message);
                alert("网络异常，请稍后再试！！")
            }
                $('#myModal').modal('hide');
                $('#inputEmail3').val('');
                $('#inputPassword3').val('');
        })
    });

});

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
                            <td><a href="">删除</a><a href="">修改</a></td>
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
function clickPage(fn){

    for(var i=0;i<$('.page').length;i++){
        $('.page').eq(i).click(function () {
            // $(this).className('active');
            $(this).addClass('active').siblings().removeClass('active');
            // $(this).toggleClass("active");
            // alert($(this).find('a').html());
        //    let page=parseInt($(this).find('a').html());
            // getData(page, 2);
            
        })
    }
}
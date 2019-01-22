
$(function(){
    $("#bannerAdd").click(function () {
        // 发送ajax请求数据到后台
        // $('#inputEmail3').val();名字
        // $('#inputPassword3').val();图片路径
        $.post('/banner/add',{
            vdName: $('#inputEmail3').val(),
            imgName: $('#inputPassword3').val()
        },function(res){
            // console.log(res);
            if(res.code===0){
                // 成功
                console.log('提交成功');
                // 把提交成功的数据渲染在页面上
            }else{
                // 失败
                console.log(res.message);
                alert("网络异常，请稍后再试！！")
            }
                $('#myModal').modal('hide');
        })
    });

})
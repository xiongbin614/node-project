$('#submit').click(function(){
    $.ajax({
        url:'/user/register',
        method:'POST',
        data: 'userName=' + $('#userName').val() + '&pwd=' + $('#pwd').val() + '&nickName=' + $('#nickName').val() + '&isAdmin=' + $('#isAdmin').val(),
        success:function(res){
            console.log(res);
            if(res.msg==='ok'){
            layer.msg('注册成功');
            setInterval(() => {
                location.href="/login"
            }, 2000);
            }
        },
        error: function (error){
            console.log(error)
        }
    })
});

$('#Lsubmit').click(function(){
    $.ajax({
        url: '/user/login',
        method: 'POST',
        data: 'userName=' + $('#LuserName').val() + '&pwd=' + $('#Lpwd').val() ,
        success: function (res) {
            console.log(res);
            if (res.msg === 'ok') {
                layer.msg('登录成功');
                setInterval(() => {
                    location.href = "/banner"
                }, 2000);
            }else{
                layer.msg('用户名或者密码错误');

            }
        },
        error: function (error) {
            console.log(error)
        }
    })
})
var result = [];
var totalPage = 0;
var page = 1;
var pageNum = 1;
var pageSize = 2;
$(function () {
    // 添加banner数据
    addCinema();
    //点击删除banner数据
    delet();
    //将banner数据渲染在页面上
    showData(pageNum, pageSize);
    // getData(1, 4);
    //点击切换页面
    clickPage();
    prevPage();
});
// 添加影院与影院地址
function addCinema(){
    $('#bannerAdd').click(function(){
        $.ajax({
            url:'/cinema/add',
            method:'POST',
            data: "cinemaName=" + $('#inputEmail3').val() + "&cinemaAdress=" + $('#inputPassword3').val(),
            success:function(res){
                console.log(res);
                $('#myModal').modal('hide');
                $('#inputEmail3').val('');
                $('#inputPassword3').val('');
                showData(pageNum, pageSize);
            },
            error: function (error){
                console.log('55');
                console.log(error.message);
                layer.msg('网络异常，请稍后重试');
            }
        })
    })
}
// 初始化展示数据
function showData(pageNum, pageSize){
    $.get('/cinema/get',{
        pageNum: pageNum,
        pageSize: pageSize
    },function(res){
            if (res.code === 0) {
                totalPage = res.totalPage;//页数
                result = res.data;//cinema数据
                showTable(result);
                showPage(totalPage);
            } else {//获取失败
                layer.msg('网络异常，请稍后重试');
            }
    })
}
// 渲染表格
function showTable(result) {
    $('.xb-show tbody').html('');
    for (var i = 0; i < result.length; i++) {
        $('.xb-show tbody').append(
            `
                        <tr>
                            <td>${result[i]._id}</td>
                            <td>${result[i].cinemaName}</td>
                            <td>${result[i].cinemaAdress}</td>
                            <td><a href="javascript:;" data-id="${result[i]._id}"  class="delet">删除</a><a href="javascript:;" class="alter"  data-toggle="modal" data-target="#myModal1" >修改</a></td>
                        </tr>
            `
        )
    };
}
// 渲染分页
function showPage(totalPage) {
    $('#page').html('');
    $('#page').append(
        `<li class='prevPage'>
                            <a href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>`
    )
    for (var j = 1; j <= totalPage; j++) {
        var className = '';
        if (j === page) {
            var className = 'active';
        }
        $('#page').append(
            `<li class="page ${className}" data-on='${j}'><a href="#">${j}</a></li>`
        )
    }
    $('#page').append(
        ` <li class='nextPage'><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`
    )
}

// 点击切换页面
function clickPage() {
    $("#page").on('click', '.page', function () {
        console.log(page)
        if (page === parseInt($(this).attr('data-on'))) {
            return;
        } else {
            page = parseInt($(this).attr('data-on'));
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            var Num = $(this).attr('data-on');
            console.log(Num)
            showData(Num, pageSize);
        }

    })
}
//点击上一页
function prevPage() {
    $('#page').on('click', '.prevPage', function () {
        if (page > 1) {
            page--;
            // clickPage()
            showData(page, pageSize);
            console.log(page)
        } else {
            console.log(page + '55')
            return;
        }

    })
    $('#page').on('click', '.nextPage', function () {
        if (page < totalPage) {
            page++;
            showData(page, pageSize);
            console.log(page)
        } else {
            console.log(page + '55')
            return;
        }

    })
}

//删除一条banner数据
function delet() {
    $(".xb-show tbody").delegate(".delet", "click", function (event) {
        layer.confirm('是否要删除?', function (index) {
            var target = $(event.target);
            // alert(target.data('id'));
            target.parent().parent().remove();
            $.get('/cinema/remove', {
                name: target.data('id')
            }, function (res) {
                if (res.code === 0) {
                    layer.msg('删除成功');
                    //删除public下面的图片文件
                    // console.log($(".xb-show tbody").html())
                    showData(page, pageSize);
                    // load();
                } else {
                    layer.msg('网络异常，请稍后再试');
                }
            })
            layer.close(index);
        });
    })
}
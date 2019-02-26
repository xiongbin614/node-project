var result = [];
var totalPage = 0;
var page = 1;
var pageNum = 1;
var pageSize = 2;
$(function () {
    // 添加banner数据
    addFilm();
    //点击删除banner数据
    delet();
    //将banner数据渲染在页面上
    getData(pageNum, pageSize);
    // getData(1, 4);
    //点击切换页面
    clickPage();
    prevPage();
});

// 添加banner数据
function addFilm(name, ingUrl) {
    $("#bannerAdd").click(function () {
        // alert(55)
        // 1. 实例化一个 FormData 对象
        var formData = new FormData();
        // 2. 给 formData 对象 加属性
        formData.append('filmName', $('#inputEmail3').val());
        formData.append('filmImg', $('#inputPassword3')[0].files[0]);
        console.log($('#inputEmail3').val(), $('#inputPassword3')[0].files[0]);
        // 发送ajax请求数据到后台
        $.ajax({
            url: '/film/add',
            method: 'POST',
            contentType: false,
            processData: false,
            data: formData,
            success: function (res) {
                console.log(res)
                layer.msg('添加成功');
                $('#myModal').modal('hide');
                $('#inputEmail3').val('');
                $('#inputPassword3').val('');
                getData(page, pageSize);
            },
            error: function (error) {
                console.log(error.message);
                layer.msg('网络异常，请稍后重试');
            },
        })
    });
}

function getData(pageNum, pageSize) {
    $.get('/film/get', {
        pageNum: pageNum,
        pageSize: pageSize
    },
        function (res) {
            if (res.code === 0) {
                totalPage = res.totalPage;//页数
                result = res.data;//banner数据
                // console.log(result.length);
                showTable(result);
                showPage(totalPage);
            } else {//获取失败
                layer.msg('网络异常，请稍后重试');
            }
        })
};

//删除一条banner数据
function delet() {
    $(".xb-show tbody").delegate(".delet", "click", function (event) {
        layer.confirm('是否要删除?', function (index) {
            var target = $(event.target);
            // alert(target.data('id'));
            target.parent().parent().remove();
            $.get('/film/remove', {
                name: target.data('id')
            }, function (res) {
                if (res.code === 0) {
                    layer.msg('删除成功');
                    //删除public下面的图片文件
                    // console.log($(".xb-show tbody").html())
                    getData(page, pageSize);
                    // load();
                } else {
                    layer.msg('网络异常，请稍后再试');
                }
            })
            layer.close(index);
        });
    })
}

// //渲染表格
function showTable(result) {
    $('.xb-show tbody').html('');
    for (var i = 0; i < result.length; i++) {
        $('.xb-show tbody').append(
            `
                        <tr>
                            <td>${result[i]._id}</td>
                            <td>${result[i].name}</td>
                            <td><img src="${result[i].imgUrl}" alt=""></td>
                            <td><a href="javascript:;" data-id="${result[i]._id}"  class="delet">删除</a><a href="javascript:;" class="alter"  data-toggle="modal" data-target="#myModal1" >修改</a></td>
                        </tr>
            `
        )
    };
}
// //渲染分页
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
            getData(Num, pageSize);
        }

    })
}
//点击上一页
function prevPage() {
    $('#page').on('click', '.prevPage', function () {
        if (page > 1) {
            page--;
            // clickPage()
            getData(page, pageSize);
            console.log(page)
        } else {
            console.log(page + '55')
            return;
        }

    })
    $('#page').on('click', '.nextPage', function () {
        if (page < totalPage) {
            page++;
            getData(page, pageSize);
            console.log(page)
        } else {
            console.log(page + '55')
            return;
        }

    })
}
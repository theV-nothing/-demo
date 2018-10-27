//获取比率数据函数
$.fn.getRate = function() {
    var wRate = this.width() / this.parent().width();
    var hRate = this.height() / this.parent().height();
    var whRate = this.width() / this.height();
    var topRate = (this[0].offsetTop + this.height() / 2) / this.parent().height();
    var leftRate = (this[0].offsetLeft + this.width() / 2) / this.parent().width();
    this.data('wRate', wRate);
    this.data('hRate', hRate);
    this.data('whRate', whRate);
    this.data('topRate', topRate);
    this.data('leftRate', leftRate);
    return this;
};
//背景图片自适应函数
$.fn.bgimgsize = function() {
    if ($(window).width() / $(window).height() > this[0].naturalWidth / this[0].naturalHeight) {
        //设置图片宽度100% 高度为宽度*1080/1920
        this.width($(window).width()).height($(window).width() / this[0].naturalWidth * this[0].naturalHeight);
        //设置图片中心点在窗口中心
        this.css({ 'marginTop': -(this.height() - $(window).height()) / 2 })
    } else {
        this.height($(window).height()).width($(window).height() * this[0].naturalWidth / this[0].naturalHeight);
        this.css({ 'marginLeft': -(this.width() - $(window).width()) / 2 })
    }
    return this
};
//盒子自适应函数
$.fn.boxsize = function() {
    if ($(window).width() / $(window).height() > 1920 / 1080) {
        //设置高为原比率 宽随高变动
        this.height(this.parent().height() * this.data('hRate')).width(this.height() * this.data('whRate'));
        //盒子位置比率不变
        //    this[0].style.top = this.parent().height() * this.data('topRate') - this.height() / 2 + 'px';
        //    this[0].style.left = this.parent().width() * this.data('leftRate') - this.width() / 2 + 'px';
    } else {
        this.width(this.parent().width() * this.data('wRate')).height(this.width() / this.data('whRate'));
    }
    this[0].style.top = this.parent().height() * this.data('topRate') - this.height() / 2 + 'px';
    this[0].style.left = this.parent().width() * this.data('leftRate') - this.width() / 2 + 'px';
    return this;
};
//创建背景星星函数
function createStar() {
    c2 = document.getElementById('mycanvas');
    ctx2 = c2.getContext('2d');
    var x = Math.random() * c2.width,
        y = Math.random() * c2.height,
        r = Math.random() * 2 + 3;
    var obj = new Object();
    obj.x = x;
    obj.y = y;
    obj.r = r;
    arr.push(obj);
    ctx2.beginPath();
    ctx2.arc(x, y, r, 0, 2 * Math.PI);
    var gradientOne = ctx2.createRadialGradient(x, y, 1, x, y, r);
    gradientOne.addColorStop(0, '#F1B337');
    gradientOne.addColorStop(1, 'transparent');
    ctx2.fillStyle = gradientOne;
    ctx2.fill();
}
//星星移动效果函数
function themove() {
    c2.width = c2.width;
    if (j >= 200 || j <= -200) {
        clearInterval(linemoveId);
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            if (obj.y + 2 * j < 0 || obj.y + 2 * j > c2.height) {
                obj.y = Math.random() * c2.height - 2 * j;
            }
            ctx2.beginPath();
            ctx2.arc(obj.x, obj.y + 2 * j, obj.r, 0, 2 * Math.PI);
            var gradientOne = ctx2.createRadialGradient(obj.x, obj.y + 2 * j, 1, obj.x, obj.y + 2 * j, obj.r);
            gradientOne.addColorStop(0, '#F1B337');
            gradientOne.addColorStop(1, 'transparent');
            ctx2.fillStyle = gradientOne;
            ctx2.fill();
            obj.y = obj.y + 2 * j;
        }
        j = 0;
        return;
    }
    if (j >= 100 || j <= -100) {
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            ctx2.beginPath();
            ctx2.moveTo(obj.x, obj.y + 3.5 * j - j / Math.abs(j) * 100);
            ctx2.lineTo(obj.x, obj.y + 3 * j);
            ctx2.lineWidth = obj.r - 2;
            ctx2.strokeStyle = '#f1d57a';
            ctx2.stroke();
        }
    } else {
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            ctx2.beginPath();
            ctx2.moveTo(obj.x, obj.y + 2.5 * j);
            ctx2.lineTo(obj.x, obj.y + 3 * j);
            ctx2.lineWidth = obj.r - 2;
            ctx2.strokeStyle = '#f1d57a';
            ctx2.stroke();
        }
    }
    if (flag) {
        j++
    } else {
        j--
    }
}

//页面加载时的动效函数
function theloading() {
    var x = ($(window).width() + $(window).height()) / (1920 + 1080);
    setTimeout(function() {
        $('.pgone').animate({
            'opacity': 1
        }, 800);
        $('.header').animate({
            'opacity': 1
        }, 800);
        $('.rightol').animate({
            'opacity': 1
        }, 800);
        $('.thunderbird , .thethunder').css('transform', 'scale(1)', 'opacity', '1');
    }, 800);
    setTimeout(function() {
        $('.centertext').animate({
            'opacity': 1
        }, 200);
        $('.centertext').css({
            'transition': 'all 0.8s',
            'transform': 'scale(1)'
        })
    }, 1500);
    window.c2 = document.getElementById('mycanvas');
    window.ctx2 = c2.getContext('2d');
    var i = 1;
    arr = [];
    setTimeout(function() {
        $('.centertext , .secondtext , .thirdtext , .fourthtext').css('transform', 'scale(' + x + ')');

        for (var i = 0; i < 31; i++) {
            createStar();
        }
    }, 1700);

    function thearc() {
        c2.setAttribute('width', window.innerWidth);
        c2.setAttribute('height', window.innerHeight);
        if (i >= 90) {
            clearInterval(loadId);
            return;
        }
        if (i < 30) {
            ctx2.beginPath();
            ctx2.arc(c2.clientWidth / 2, c2.clientHeight / 2, 5 + 1.05 * i, 0, Math.PI * 2);
            ctx2.strokeStyle = '#fff';
            ctx2.stroke();
            ctx2.beginPath();
            ctx2.arc(c2.clientWidth / 2, c2.clientHeight / 2, 4 + 0.75 * i, 0, Math.PI * 2);
            ctx2.strokeStyle = '#fff';
            ctx2.stroke();
            ctx2.beginPath();
            ctx2.arc(c2.clientWidth / 2, c2.clientHeight / 2, 3 + 0.45 * i, 0, Math.PI * 2);
            ctx2.strokeStyle = '#fff';
            ctx2.stroke();
            ctx2.beginPath();
            ctx2.arc(c2.clientWidth / 2, c2.clientHeight / 2, 2 + 0.15 * i, 0, Math.PI * 2);
            ctx2.strokeStyle = '#fff';
            ctx2.stroke();
        } else {
            ctx2.beginPath();
            ctx2.arc(c2.clientWidth / 2, c2.clientHeight / 2, 60 * (i - 28), 0, Math.PI * 2);
            var myGradient2 = ctx2.createRadialGradient(c2.clientWidth / 2, c2.clientHeight / 2, 1, c2.clientWidth / 2 * 0.2, c2.clientHeight / 2 * 0.5, 60 * (i - 28));
            myGradient2.addColorStop(0, 'transparent');
            myGradient2.addColorStop(1, 'white');
            ctx2.fillStyle = myGradient2;
            ctx2.fill();
            ctx2.strokeStyle = 'transparent';
            ctx2.stroke();
        }
        i++;
    }

    var loadId = setInterval(thearc, 1000 / 60)
}
//主体js
$(window).load(function() {
    window.j = 0;
    window.flag = false;
    window.arr = [];
    window.linemoveId = null;
    //获取背景图片比率数据并自适应窗口
    $('.changeimgsize').each(function() {
        $(this).getRate();
        $(this).bgimgsize()
    });
    //设置css样式属性
    $('.header h1').css('marginTop', -2000 / $(window).height() - 2500 / $(window).width());
    $('.header>ul>li').css('marginRight', $(window).height() / 12 + $(window).width() / 30);
    //获取页面比率数据
    $('.boxsize').each(function() {
        $(this).getRate();
    });
    $('.page').css({
        'width': '100%',
        'height': '100%'
    });
    //设置页面按比率缩放
    $('.boxsize').each(function() {
        $(this).boxsize();
    });
    //页面加载时动画
    theloading();
    $(window).resize(function() {
            $('.header h1').css('marginTop', -2000 / $(window).height() - 2500 / $(window).width());
            $('.header>ul>li').css('marginRight', $(window).height() / 12 + $(window).width() / 30);
            $('.changeimgsize').bgimgsize();
            $('.boxsize').each(function() {
                $(this).boxsize()
            });

            $('.changeimgsize').bgimgsize();
            $('.boxsize').each(function() {
                $(this).boxsize()
            });
            var x = ($(window).width() + $(window).height()) / (1920 + 1080);
            $('.centertext , .secondtext , .thirdtext , .fourthtext').css('transform', 'scale(' + x + ')');
        })
        //轮播效果
    ;
    (function() {
        var theIndex = 0;
        var index;
        //点击切换
        setTimeout(function() {
            var thezero = 0;
            var theone = 1;
            //点击时切换
            $('.rightol li').click(function() {
                var delay = 1350;
                if (theone > 1) {
                    return;
                }
                clearInterval(linemoveId);
                index = $(this).index();
                if (theIndex === index) {
                    return;
                }
                theone++;
                $('.rightol li').eq(index).addClass('current');
                $('.rightol li').eq(index).siblings().removeClass('current');
                $('.page').eq(index).siblings('.page').css('zIndex', '1');
                $('.page').eq(index).css('zIndex', '98');
                $('#bgul li').eq(theIndex).animate({ opacity: 0 }, 1000);
                setTimeout(function() {
                    $('#bgul li').eq(index).animate({ opacity: 1 }, 100);
                }, 40);
                $('.page').eq(theIndex).animate({ opacity: 0 }, 500);
                if (theIndex === 0) {
                    $('.quan1 ,.quan3').css('animation', 'myrotate2 3s linear infinite');
                    $('.quan2 ,.quan4').css('animation', 'myrotate1 3s linear infinite');
                    $('.thunderbird , .thethunder').css('transform', 'scale(0)', 'opacity', '0');
                    $('.centertext').css('opacity', '0');
                }
                $('.page').eq(theIndex).find('.theup').animate({ marginTop: '-200px' }, 800);
                $('.page').eq(theIndex).find('.thedown').animate({ marginTop: '200px' }, 800);
                $('.huangguan-l , .huangguan-r , .hotb-left , .hotb-right ').animate({ margin: '200 0 0 0' }, 800);
                setTimeout(function() {
                    $('.huangguan-l , .hotb-left').animate({ marginLeft: '-30px' }, 400);
                    $('.huangguan-r , .hotb-right').animate({ marginLeft: '30px' }, 400);
                }, 1000);
                setTimeout(function() {
                    $('.page').eq(index).find('.theup').css({ marginTop: '-200px' });
                    $('.page').eq(index).find('.thedown').css({ marginTop: '200px' });
                    $('.page').eq(index).find('.theup').animate({ marginTop: '0' }, 800);
                    $('.page').eq(index).find('.thedown').animate({ marginTop: '0' }, 800);
                }, 400);
                if (index === 0) {
                    $('.toup').eq(theIndex).animate({ marginTop: '3000px' }, 800);
                    $('.quan1 ,.quan3').css('animation', 'myrotate1 7s linear infinite');
                    $('.quan2 ,.quan4').css('animation', 'myrotate2 7s linear infinite');
                    $('.pgone').css('opacity', 0);
                    $('.header').css('opacity', 0);
                    $('.rightol').css('opacity', 0);
                    $('.centertext').css({
                        opacity: 0,
                        transform: 'scale(1.2)'
                    });
                    setTimeout(function() {
                        theloading()
                    }, 400);
                    theIndex = index;
                    delay = 3000;
                    setTimeout(function() {
                        theone = 1
                    }, delay);
                    return;
                }
                if (theIndex < index) {
                    $('.toup').eq(theIndex).animate({ marginTop: '-3000px' }, 800);
                    setTimeout(function() {
                        $('.page').eq(index).animate({ opacity: 1 }, 500);
                        $('.toup').eq(index).css({ marginTop: '3000px' });
                        $('.toup').eq(index).animate({ marginTop: '0' }, 800);
                    }, 300);
                    flag = false;
                    linemoveId = setInterval(themove, 1000 / 200);
                } else {
                    $('.toup').eq(theIndex).animate({ marginTop: '3000px' }, 800);
                    setTimeout(function() {
                        $('.page').eq(index).animate({ opacity: 1 }, 500);
                        $('.toup').eq(index).css({ marginTop: '-3000px' });
                        $('.toup').eq(index).animate({ marginTop: '0' }, 800);
                    }, 300);
                    flag = true;
                    linemoveId = setInterval(themove, 1000 / 200);
                }
                theIndex = index;
                setTimeout(function() {
                    theone = 1
                }, delay);
            });
            //自动播放
            setInterval(function() {
                if (theIndex !== 3) {
                    $('.rightol li').eq(theIndex + 1).click()
                } else {
                    $('.rightol li').eq(0).click()
                }
            }, 6500);
            //鼠标滚轮时切换
            document.onwheel = function(e) {
                var delay = 1100;
                if (thezero > 0) {
                    return;
                }
                thezero++;
                if ((theIndex === 0 && e.wheelDelta > 0) || (theIndex === 3 && e.wheelDelta < 0)) {
                    delay = 200;
                }
                if (e.wheelDelta < 0 && theIndex < 3) {
                    $('.rightol li').eq(theIndex + 1).click();
                }
                if (e.wheelDelta > 0 && theIndex > 0) {
                    $('.rightol li').eq(theIndex - 1).click();
                }
                if (theIndex === 0) {
                    delay = 3000
                }
                setTimeout(function() {
                    thezero = 0
                }, delay);
            }
        }, 3000)
    })();

    //导航栏动画
    //鼠标移入
    $('.nav-list li').mouseenter(function() {
        $(this).find('span').stop().animate({
            'height': '4px',
            'width': '100%',
            'left': 0
        }, 200)
    });
    //鼠标移出
    $('.nav-list li').mouseleave(function() {
        $(this).find('span').stop().animate({
            'width': 0,
            'left': $(this).width()
        }, 200, function() {
            $(this).css({
                'display': 'none',
                'left': '0'
            });
        })
    });
    //下载按钮动效
    $('.download').mouseenter(function() {
        $(this).css({
            'transition': 'all 1s',
            'backgroundColor': 'rgba(241,213,122,.2)'
        })
    });
    $('.download').mouseleave(function() {
        $(this).css({
            'transition': 'all 1s',
            'backgroundColor': 'transparent'
        })
    })
});
import '../css/nav.less';
import '../css/index.less';
const fullpage = require('fullpage.js');

(function(window, document, $) {
    $(document).ready(function () {
        let pathname = window.location.pathname;
        pathname = pathname == '/' ? '/index.html' : pathname;
        const reg = /(\w*\/)(\w*)(\.html)/;
        const matchArr = pathname.match(reg);
        const activePage = matchArr[matchArr.length - 2];
        $("." + activePage).addClass("active").siblings().removeClass("active");

        var postfix ="";
        var protocol = postfix == "" ? window.location.protocol: "http:";
        var serverName, hostName;
        switch (postfix){
            case "":
                hostName = "//app.familyktv.com/"
                break;
            case "Cn":
                hostName = "//family.yanchang8.cn/";
                break;
            case "Dev":
                hostName = "//10.0.0.157:60000/"
                break;
            default:
                break;
        }
        serverName = protocol + hostName;

        $("#fullpage").fullpage({
            anchors: ["sec1", "sec2", "sec3", "sec4", "sec5"],
            verticalCentered: true,

            afterRender: function() {
                $(".section").removeClass("opaHide");
            },
            afterLoad: function (anchorlink, index) {
                switch (index) {
                    case 1:
                        $(".syHz").addClass("animated pulse");
                        $(".goTop").addClass("hide");
                        break;
                    case 2:
                        $(".sec2 span").addClass("animated flash");
                        break;
                    case 3:
                        $(".left").addClass("animated slideInLeft").removeClass("hide");
                        $(".right").addClass("animated slideInRight").removeClass("hide");
                        break;
                    case 4:
                        for (let i = 1; i < 5; i++) {
                            (function (i) {
                                setTimeout(() => {
                                    $(".circle" + i).addClass("animated zoomIn").removeClass("hide");
                                }, 300 * i);
                            })(i);
                        }
                        break;
                    case 5:
                        $(".kindergarten").each((i, ele) => {
                            i = i < 5 ? 1 : i < 10 ? 2 : 3;
                            if (i == 2) {
                                $(ele).addClass("animated lightSpeedInLeft").removeClass("opaHide");
                            } else {
                                $(ele).addClass("animated lightSpeedIn").removeClass("opaHide");
                            }   
                        })
                        break;
                    default:
                        break;
                }
            },
            onLeave: function (index, nextIndex, direction) {
                switch (index) {
                    case 1:
                        $(".syHz").removeClass("animated pulse");
                        $(".goTop").removeClass("hide");
                        break;
                    case 2:
                        $(".sec2 span").removeClass("animated flash");
                        break;
                    case 3:
                        $(".left").removeClass("animated slideInLeft").addClass("hide");
                        $(".right").removeClass("animated slideInRight").addClass("hide");
                        break;
                    case 4:
                        $(".circle1").addClass("hide").removeClass("animated zoomIn");
                        $(".circle2").addClass("hide").removeClass("animated zoomIn");
                        $(".circle3").addClass("hide").removeClass("animated zoomIn");
                        $(".circle4").addClass("hide").removeClass("animated zoomIn");
                        break;
                    case 5:
                        $(".kindergarten").addClass("opaHide").removeClass("animated lightSpeedInLeft");
                        $(".kindergarten").addClass("opaHide").removeClass("animated lightSpeedIn");
                        break;
                    default:
                        break;
                }
            }
        })

        $(".goTop").on("click", function(){
            $.fn.fullpage.moveTo("sec1");
        })

        $(".try .txt").on("click", function(){
            $('.formWrap').removeClass('hide');
            $.fn.fullpage.setKeyboardScrolling(false);
			$.fn.fullpage.setAllowScrolling(false);
        })

        $(".close").on('click', function(){
            $('.formWrap').addClass('hide');
            $.fn.fullpage.setKeyboardScrolling(true);
			$.fn.fullpage.setAllowScrolling(true);
        })

        let ajaxFlag = false;
        $(".tryBtn").on("click", function(e){
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.stopPropagation();
            }
            let name = $("#name")[0].value;
            let tel = $("#tel")[0].value;
            let addr = $("#addr")[0].value;
            let age = $("#age")[0].value;

            let telReg = /1[1-9][0-9]\d{8}$/;
            let gdTelReg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
            
            if (name == '') {
                showToast('请输入您的姓名');
                $("#name")[0].focus();
                return;
            } else if (tel == '') {
                showToast('请输入你的电话号码');
                $("#tel")[0].focus();
                return;
            } else if (!telReg.test(tel) && !gdTelReg.test(tel)) {
                showToast('您输入的电话号码格式不正确哦');
                $("#tel")[0].focus();
                return;
            } else if (addr == '') {
                showToast('请输入您的地址');
                $("#addr")[0].focus();
                return;
            } else {
                if (!ajaxFlag) {
                    ajaxFlag = true;
                    $.ajax({
                        url: serverName + "apply/product",
                        type: 'POST',
                        dataType: 'JSON',
                        data: {
                            name, tel, addr, age
                        },
                        success: function (e){
                            $(".tryForm .tryLeft").addClass('hide');
                            $(".tryForm .qrcode").addClass('hide');
                            $(".tryForm .tryBtn").addClass('hide');
                            if (e.returnCode == 0) {
                                $('.success').removeClass('hide');
                                for (let i = 5; i > -1; i--) {
                                    setTimeout(() => {
                                        $('.success p span').text(i);
                                        if (i == 0) {
                                            $('.formWrap').addClass('hide');
                                            $('.success').addClass('hide');
                                            $(".tryForm .tryLeft").removeClass('hide');
                                            $(".tryForm .qrcode").removeClass('hide');
                                            $(".tryForm .tryBtn").removeClass('hide');
                                            $.fn.fullpage.setKeyboardScrolling(true);
                                            $.fn.fullpage.setAllowScrolling(true);
                                            ajaxFlag = false;     
                                        }
                                    }, (5 - i) * 1000);
                                }
                            } else {
                                $('.failed').removeClass('hide');
                                $('.tryAgain').on('click', function(e){
                                    if (e.preventDefault) {
                                        e.preventDefault();
                                    } else {
                                        e.stopPropagation();
                                    }
                                    $('.failed').addClass('hide');
                                    $(".tryForm .tryLeft").removeClass('hide');
                                    $(".tryForm .qrcode").removeClass('hide');
                                    $(".tryForm .tryBtn").removeClass('hide');
                                    ajaxFlag = false;
                                })
                            }
                        },
                        error: function (e){
                            $(".tryForm .tryLeft").addClass('hide');
                            $(".tryForm .qrcode").addClass('hide');
                            $(".tryForm .tryBtn").addClass('hide');
                            $('.failed').removeClass('hide');
                            $('.tryAgain').on('click', function(e){
                                if (e.preventDefault) {
                                    e.preventDefault();
                                } else {
                                    e.stopPropagation();
                                }
                                $('.failed').addClass('hide');
                                $(".tryForm .tryLeft").removeClass('hide');
                                $(".tryForm .qrcode").removeClass('hide');
                                $(".tryForm .tryBtn").removeClass('hide');
                                ajaxFlag = false;
                            })
                        }
                    })
                }
            }
            
        })

        function showToast(str) {
            $('.toast').text(str);
            $('.toast').removeClass('hide');
            setTimeout(() => {
                $('.toast').addClass('hide');
                $('.toast').text('');
            }, 2000);
        }
    })
})(window, document, $);
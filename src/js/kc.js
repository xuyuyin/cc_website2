import '../css/nav.less';
import '../css/kc.less';
const fullpage = require('fullpage.js');

(function(window, document) {
    $(document).ready(function () {
        const pathname = window.location.pathname;
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
            anchors: ["sec1", "sec2", "sec3"],
            verticalCentered: true,

            afterRender: function() {
                $(".section").removeClass("opaHide");
            },
            afterLoad: function (anchorlink, index) {
                switch (index) {
                    case 1:
                        $(".goTop").addClass("hide");
                        setTimeout(() => {
                            $(".sec1 .listItem:lt(4)").addClass("animated lightSpeedInLeft").removeClass("opaHide");
                            $(".sec1 .listItem:gt(3)").addClass("animated lightSpeedIn").removeClass("opaHide");
                        }, 100);
                        break;
                    case 2:
                        $(".sec2 .listItem").each(function (index, ele) {
                            var _that = $(this);
                            setTimeout(() => {
                                _that.addClass("animated zoomIn").removeClass("opaHide");
                            }, index * 100)
                        })
                        break;
                    case 3:
                        $(".sec3 .listItem:eq(0)").addClass("animated bounceInLeft").removeClass("opaHide");
                        $(".sec3 .listItem:eq(1)").addClass("animated bounceInDown").removeClass("opaHide");
                        $(".sec3 .listItem:eq(2)").addClass("animated bounceInRight").removeClass("opaHide");
                        break;
                    default:
                        break;
                }
            },
            onLeave: function (index, nextIndex, direction) {
                switch (index) {
                    case 1:
                        $(".sec1 .listItem:lt(4)").removeClass("animated lightSpeedInLeft").addClass("opaHide");
                        $(".sec1 .listItem:gt(3)").removeClass("animated lightSpeedIn").addClass("opaHide");
                        $(".goTop").removeClass("hide");
                        break;
                    case 2:
                        $(".sec2 .listItem").removeClass("animated zoomIn").addClass("opaHide");
                        break;
                    case 3:
                        $(".sec3 .listItem:eq(0)").removeClass("animated bounceInLeft").addClass("opaHide");
                        $(".sec3 .listItem:eq(1)").removeClass("animated bounceInDown").addClass("opaHide");
                        $(".sec3 .listItem:eq(2)").removeClass("animated bounceInRight").addClass("opaHide");
                        break;
                    default:
                        break;
                }
            }
        })

        $(".goTop").on("click", function(){
            $.fn.fullpage.moveTo("sec1");
        })

        $(".playWrap").on(mobileUtil.tapEvent, function (e) {
            if (e.target != $("video")[0]) {
                $("video").attr("src", "");
                $(this).addClass("hide");
                $("nav").removeClass("hide");
                $.fn.fullpage.setKeyboardScrolling(true);
                $.fn.fullpage.setAllowScrolling(true);
            }
            
        })
        $("img").each(function (index, ele) {
            $(this).on(mobileUtil.tapEvent, function () {
                const videopath = $(this).attr("data-source");
                $(".playWrap").removeClass("hide");
                $("nav").addClass("hide");
                $("video").attr("src", videopath);
                $.fn.fullpage.setKeyboardScrolling(false);
                $.fn.fullpage.setAllowScrolling(false);
            })
        })

        $(".playBtn").each(function (index, ele) {
            $(this).on(mobileUtil.tapEvent, function () {
                const videopath = $(this).parent().children("img").attr("data-source");
                $(".playWrap").removeClass("hide");
                $("nav").addClass("hide");
                $("video").attr("src", videopath);
                $.fn.fullpage.setKeyboardScrolling(false);
                $.fn.fullpage.setAllowScrolling(false);
            })
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
})(window, document);
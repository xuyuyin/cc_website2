import '../css/nav.less';
import '../css/wjj.less';
const fullpage = require('fullpage.js');
(function(window, document) {
    $(document).ready(() => {
        if (mobileUtil.isMobile) {
            $("nav").css("background-image", "url()");
            $("nav ul").css({ "margin": "1.25rem auto 0", "width": "100%" });
        }

        const pathname = window.location.pathname;
        const reg = /(\w*\/)(\w*)(\.html)/;
        const matchArr = pathname.match(reg);
        const activePage = matchArr[matchArr.length - 2];
        $("." + activePage).addClass("active").siblings().removeClass("active");

        $("#fullpage").fullpage({
            anchors: ["sec1", "sec2", "sec3", "sec4", "sec5", "sec6"],
            verticalCentered: true,

            afterRender: function() {
                $(".section").removeClass("opaHide");
            },
            afterLoad: function (anchorlink, index) {
                switch (index) {
                    case 1:
                        $(".goTop").addClass("hide");
                        for (let i = 1; i < 4; i++) {
                            setTimeout(() => {
                                $(".zi" + i).addClass("animated pulse");
                            }, (i - 1) * 200);
                        }
                        break;
                    case 2:
                        for (let i = 1; i < 5; i++) {
                            setTimeout(() => {
                                $(".how" + i).addClass("animated jello");
                            }, (i - 1) * 200);  
                        }
                        break;
                    case 3:
                        $(".sec3 .dot").each(function() {
                            $(this).addClass("animated zoomIn").removeClass("hide");
                        })
                        setTimeout(() => {
                            $(".sxt .line").addClass("animated slideInLeft").removeClass("hide");
                            $(".sysb .line").addClass("animated slideInLeft").removeClass("hide");
                            $(".szq .line").addClass("animated slideInRight").removeClass("hide");
                            $(".fxq .line").addClass("animated slideInRight").removeClass("hide");
                            $(".shuzq .line").addClass("animated slideInRight").removeClass("hide");
                        }, 200);
                        setTimeout(() => {
                            $(".sxt .txt").addClass("animated slideInLeft").removeClass("hide");
                            $(".sysb .txt").addClass("animated slideInLeft").removeClass("hide");
                            $(".szq .txt").addClass("animated slideInRight").removeClass("hide");
                            $(".fxq .txt").addClass("animated slideInRight").removeClass("hide");
                            $(".shuzq .txt").addClass("animated slideInRight").removeClass("hide");
                        }, 400);
                        break;
                    case 4:
                        $($(".sec4 .item")[0]).addClass("animated zoomIn").removeClass("opaHide");
                        $($(".sec4 .item")[3]).addClass("animated zoomIn").removeClass("opaHide");
                        setTimeout(() => {
                            $($(".sec4 .item")[1]).addClass("animated zoomIn").removeClass("opaHide");
                            $($(".sec4 .item")[2]).addClass("animated zoomIn").removeClass("opaHide");
                        }, 200);
                        break;
                    case 5:
                        $(".wd .left").addClass("animated slideInLeft").removeClass("hide");
                        $(".wd .rightTitle").addClass("animated lightSpeedIn").removeClass("hide");
                        $(".wd .rightContent").addClass("animated lightSpeedIn").removeClass("hide");
                        setTimeout(() => {
                            $(".wd .pic").addClass("animated zoomIn").removeClass("hide");
                        }, 100);
                        setTimeout(() => {
                            $(".kc .left").addClass("animated slideInLeft").removeClass("hide");
                            $(".kc .rightTitle").addClass("animated lightSpeedIn").removeClass("hide");
                            $(".kc .rightContent").addClass("animated lightSpeedIn").removeClass("hide");
                        }, 200);
                        setTimeout(() => {
                            $(".kc .pic").addClass("animated zoomIn").removeClass("hide");
                        }, 300);
                        setTimeout(() => {
                            $(".zp .left").addClass("animated slideInLeft").removeClass("hide");
                            $(".zp .rightTitle").addClass("animated lightSpeedIn").removeClass("hide");
                            $(".zp .rightContent").addClass("animated lightSpeedIn").removeClass("hide");
                        }, 400);
                        setTimeout(() => {
                            $(".zp .pic").addClass("animated zoomIn").removeClass("hide");
                        }, 500);
                        break;
                    case 6:
                        $(".price i").addClass("bounceIn animated");
                        break;
                    default:
                        break;
                }
            },
            onLeave: function (index, nextIndex, direction) {
                switch (index) {
                    case 1:
                        $(".zi1").removeClass("animated pulse");
                        $(".zi2").removeClass("animated pulse");
                        $(".zi3").removeClass("animated pulse");
                        $(".goTop").removeClass("hide");
                        break;
                    case 2:
                        $(".how").removeClass("animated jello");
                        break;
                    case 3:
                        $(".sec3 .dot").removeClass("animated zoomIn").addClass("hide");
                        $(".sec3 .line").removeClass("animated slideInLeft").addClass("hide");
                        $(".sec3 .txt").removeClass("animated slideInLeft").addClass("hide");
                        break;
                    case 4:
                        $(".sec4 .item").addClass("opaHide").removeClass("animated zoomIn");
                        break;
                    case 5:
                        $(".left").removeClass("animated slideInLeft").addClass("hide");
                        $(".rightTitle").removeClass("animated lightSpeedIn").addClass("hide");
                        $(".rightContent").removeClass("animated lightSpeedIn").addClass("hide");
                        $(".pic").removeClass("animated zoomIn").addClass("hide");
                        break;
                    case 6:
                        $(".price i").removeClass("bounceIn animated");
                        break;
                    default:
                        break;
                }
            }
        })

        $(".goTop").on("click", function(){
            $.fn.fullpage.moveTo("sec1");
        })
    })
})(window, document);
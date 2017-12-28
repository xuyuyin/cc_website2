import '../css/nav.less';
import '../css/app.less';
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
            anchors: ["sec1", "sec2", "sec3", "sec4"],
            verticalCentered: true,

            afterRender: function() {
                $(".section").removeClass("opaHide");
            },
            afterLoad: function (anchorlink, index) {
                switch (index) {
                    case 1:
                        $(".goTop").addClass("hide");
                        $(".qrcode").addClass("animated jello");
                        break;
                    case 2:
                        $(".sec2 h3").addClass("animated slideInRight").removeClass("hide");
                        setTimeout(() => {
                            $(".sec2 h4").addClass("animated slideInRight").removeClass("hide");
                        }, 100);
                        setTimeout(() => {
                            $(".sec2 p").addClass("animated slideInRight").removeClass("hide");
                        }, 200);
                        break;
                    case 3:
                        $(".sec3 h3").addClass("animated slideInLeft").removeClass("hide");
                        setTimeout(() => {
                            $(".sec3 h4").addClass("animated slideInLeft").removeClass("hide");
                        }, 100);
                        setTimeout(() => {
                            $(".sec3 p").addClass("animated slideInLeft").removeClass("hide");
                        }, 200);
                        break;
                    case 4:
                        $(".sec4 h3").addClass("animated slideInRight").removeClass("hide");
                        setTimeout(() => {
                            $(".sec4 h4").addClass("animated slideInRight").removeClass("hide");
                        }, 100);
                        setTimeout(() => {
                            $(".sec4 p").addClass("animated slideInRight").removeClass("hide");
                        }, 200);
                        break;
                    default:
                        break;
                }
            },
            onLeave: function (index, nextIndex, direction) {
                switch (index) {
                    case 1:
                        $(".qrcode").removeClass("animated jello");
                        $(".goTop").removeClass("hide");
                        break;
                    case 2:
                        $(".sec2 h3").removeClass("animated slideInRight").addClass("hide");
                        $(".sec2 h4").removeClass("animated slideInRight").addClass("hide");
                        $(".sec2 p").removeClass("animated slideInRight").addClass("hide");
                        break;
                    case 3:
                        $(".sec3 h3").removeClass("animated slideInLeft").addClass("hide");
                        $(".sec3 h4").removeClass("animated slideInLeft").addClass("hide");
                        $(".sec3 p").removeClass("animated slideInLeft").addClass("hide");
                        break;
                    case 4:
                        $(".sec4 h3").removeClass("animated slideInRight").addClass("hide");
                        $(".sec4 h4").removeClass("animated slideInRight").addClass("hide");
                        $(".sec4 p").removeClass("animated slideInRight").addClass("hide");
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
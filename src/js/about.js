import '../css/nav.less';
import '../css/about.less';
const fullpage = require('fullpage.js');

(function(window, document) {
    $(document).ready(function () {
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
            anchors: ["sec1", "sec2"],
            verticalCentered: true,

            afterRender: function() {
                $(".section").removeClass("opaHide");
            },
            afterLoad: function (anchorlink, index) {
                switch (index) {
                    case 1:
                        $(".goTop").addClass("hide");
                        $(".sec1 .logo").addClass("animated bounceIn").removeClass("opaHide");
                        break;
                    case 2:
                        $(".sec2 img").addClass("animated flipInX").removeClass("opaHide");
                        $(".sec2 .img").addClass("animated flipInX").removeClass("opaHide");
                    default:
                        break;
                }
            },
            onLeave: function (index, nextIndex, direction) {
                switch (index) {
                    case 1:
                        $(".sec1 .logo").removeClass("animated bounceIn").addClass("opaHide");
                        $(".goTop").removeClass("hide");
                        break;
                    case 2:
                        $(".sec2 img").removeClass("animated flipInX").addClass("opaHide");
                        $(".sec2 .img").removeClass("animated flipInX").addClass("opaHide");
                    default:
                        break;
                }
            }
        })

        $(".goTop").on("click", function(){
            $.fn.fullpage.moveTo("sec1");
        })
    });
})(window, document);
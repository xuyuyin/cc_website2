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
    })
})(window, document, $);
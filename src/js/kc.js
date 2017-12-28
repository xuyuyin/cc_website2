import '../css/nav.less';
import '../css/kc.less';
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
                $(document).off("scroll", noscroll);
                document.documentElement.style.overflow = 'auto';
            }
            
        })
        $("img").each(function (index, ele) {
            $(this).on(mobileUtil.tapEvent, function () {
                const videopath = $(this).attr("data-source");
                $(".playWrap").removeClass("hide");
                $("nav").addClass("hide");
                $("video").attr("src", videopath);
                $(document).on("scroll", noscroll);
                document.documentElement.style.overflow = 'hidden';
            })
        })

        $(".playBtn").each(function (index, ele) {
            $(this).on(mobileUtil.tapEvent, function () {
                const videopath = $(this).parent().children("img").attr("data-source");
                $(".playWrap").removeClass("hide");
                $("nav").addClass("hide");
                $("video").attr("src", videopath);
                $(document).on("scroll", noscroll);
                document.documentElement.style.overflow = 'hidden';
            })
        })
    })
})(window, document);
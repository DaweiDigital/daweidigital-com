$(document).ready(function() {
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice) {
        $('html').removeClass('no-touch');
    }

    var myLazyLoad = new LazyLoad();

    var ll = $('.lazy-bg');
    var lh = [];
    var wscroll = 0;
    var wh = $(window).height();

    function update_offsets() {
        $('.lazy-bg').each(function() {
            var x = $(this).offset().top;
            lh.push(x);
        });
    }
    ;

    function lazy() {
        wscroll = $(window).scrollTop();
        for (i = 0; i < lh.length; i++) {
            if (lh[i] <= wscroll + (wh - 200)) {
                $('.lazy-bg').eq(i).addClass('loaded');
            }
            ;
        }
        ;
    }
    ;

    //// Page Load
    update_offsets();
    lazy();

    $(window).on('scroll', function() {
        lazy();
    });

    $('.cookie-message').cookieBar({closeButton: '.js-close-button'});

    fullHeightbanner();

    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            $(".js-scroll-top").addClass("show-it");
        }
        else {
            $(".js-scroll-top").removeClass("show-it");
        }
    });

    $(".js-form-control").focusout(function() {
        var textValue = $(this).val();
        if (textValue === "") {
            $(this).removeClass("has-value");
        } else {
            $(this).addClass("has-value");
        }
    });

    $(document).on("click", ".js-scroll-top", function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, '500', 'swing');
    });

    $(window).scroll(startSkillBar);
    function startSkillBar() {
        if ($(window).scrollTop() > 200) {
            $(window).off("scroll", startSkillBar);
            $('.skillbar').each(function() {
                $(this).find('.skillbar-bar').animate({
                    width: $(this).attr('data-percent')
                }, 6000);
            });
        }
    }

    $(window).scroll(startCounter);
    function startCounter() {
        if ($(window).scrollTop() > 200) {
            $(window).off("scroll", startCounter);
            $('.js-number-count').each(function() {
                var $this = $(this);
                jQuery({Counter: 0}).animate({Counter: $this.text()}, {
                    duration: 5000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
        }
    }

    $('#particles-js').particleground({
        dotColor: 'rgba(255, 255, 255, 0.40)',
        lineColor: 'rgba(255, 255, 255, 0.21)',
        parallaxMultiplier: 5,
        particleRadius: 5,
        proximity: 130,
        density: 12000
    });

    var images = ['bg-image-1', 'bg-image-2'];
    $('.main-banner').addClass(images[Math.floor(Math.random() * images.length)]);

    /* DETECT IOS DEVICES */
    var deviceAgent = navigator.userAgent.toLowerCase();

    if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
        $('html').addClass('detected-ios');
    }

    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        // On-page links
        if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
                ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                    ;
                });
            }
        }
    });

    if (window.matchMedia("(max-width: 47.938em)").matches) {
        $(document).on("click touchstart", ".js-overlay, .js-close, .navbar-link", function() {
            $(".site-primary-navigation").removeClass("is-show");
            $(".navbar-responsive").removeClass("active");
            $(".js-overlay").removeClass("is-show");
            $("html").removeClass("responsive-menu-is-show");
        });

        $(".navbar-toggle").click(function() {
            if ($(".site-primary-navigation").hasClass("is-show")) {
                $(".site-primary-navigation").removeClass("is-show");
                $(".navbar-responsive").removeClass("active");
                $(".js-overlay").removeClass("is-show");
                $("html").removeClass("responsive-menu-is-show");
            } else {
                $(".site-primary-navigation").addClass("is-show");
                $(".navbar-responsive").addClass("active");
                $(".js-overlay").addClass("is-show");
                $("html").addClass("responsive-menu-is-show");
            }
        });

        if ($(".dropdown").length > 0) {
            $(".dropdown").append("<div class='dropdown-for-mobile js-dropdown'>Show</div>");
        }

        $(document).on("click", ".dropdown-for-mobile", function() {
            $(".dropdown").toggleClass("is-show");
        });
    }
});

function fullHeightbanner() {

    var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    $(".js-full-screen-preview").css("height", windowHeight);

    $(window).resize(function() {
        var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        $(".js-full-screen-preview").css("height", windowHeight);
    });
}
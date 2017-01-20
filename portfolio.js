/*global $ */
/*jslint node: true*/
function getWidth(obj) {
    var clone = obj.clone();
    clone.css("visibility", "hidden");
    $('body').append(clone);
    var width = clone.outerWidth();
    clone.remove();
    return width;
}

function getHeight(obj) {
    var clone = obj.clone();
    clone.css("visibility", "hidden");
    $('body').append(clone);
    var height = clone.outerHeight();
    clone.remove();
    return height;
}

function offset(pic) {
    // If horizontal or square img
    if ($(pic).css('width') >= $(pic).css('height')) {
        alert("horizontal");
        // Set height
        $(pic).css('width', '274px');
        // 
        if (parseInt($(pic).css('height')) < 200) {
            $(pic).css('width', '');
            $(pic).css('height', '200px');
        }
    }
    else {
        $(pic).css('height', '200px');
        alert("vertical");
    }
    return;
}

function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0) // If Internet Explorer, return version number
        return true;
    else // If another browser, return 0
        return false;
}

function navClick(link) {
    if ($(link).hasClass('contact-link') === true) {
        contact();
        return;
    }
    // Return if active nav was clicked on
    if ($(link).hasClass('active-nav') === true) {
        return;
    }
    // Update active page
    if ($(link).hasClass('home-link') === true) home();
    else if ($(link).hasClass('portfolio-link') === true) portfolio();
    else if ($(link).hasClass('resume-link') === true) resume();
    return;
}

function nav(page) {
    if (page === "" || page != home || page != portfolio || page != resume) {
        page = home;
    }
    else {
        var pageClass = "." + page + "-link";
        var pageID = "#" + page;
    }
    // Update active nav pointer
    $('.active-nav').removeClass('active-nav');
    $(pageClass).addClass('active-nav');
    // Fade out old page
    $('.active').hide().removeClass('active');
    $(pageID).addClass('active');
    $(pageID).css('display', '');
    // Fade in new active page
    $('.active').show();
    // Update background color
    if (page === "home") $('body').css('background-color', '#fff');
    else $('body').css('background-color', 'white');
    return;
}

function home() {
    // Update active nav pointer
    $('.active-nav').removeClass('active-nav');
    $('.home-link').addClass('active-nav');
    // Fade out old page
    $('.active').hide().removeClass('active');
    $('#home').addClass('active');
    // Fade in new active page
    $('.active').show();
    // Update background color
    $('body').css('background-color', '#fff');
    return;
}

function portfolio() {
    // Update active nav pointer
    $('.active-nav').removeClass('active-nav');
    $('.portfolio-link').addClass('active-nav');
    // Fade out old page
    $('.active').hide().removeClass('active');
    $('#portfolio').addClass('active');
    $('#portfolio').css('display', '');
    // Fade in new active page
    $('.active').show();
    // Update background color
    $('body').css('background-color', 'white');
    return;
}

function resume() {
    // Update active nav pointer
    $('.active-nav').removeClass('active-nav');
    $('.resume-link').addClass('active-nav');
    // Fade out old page
    $('.active').hide().removeClass('active');
    $('#resume').addClass('active');
    $('#resume').css('display', '');
    // Fade in new active page
    $('.active').show();
    // Update background color
    $('body').css('background-color', 'white');
    return;
}

function contact() {
    $('html, body').animate({
        scrollTop: $(document).height() - $(window).height() - 5
    }, 300).promise().then(function () {
        $('.icon').effect('shake', {
            times: 1
            , distance: 7
            , direction: 'left'
        }, 200);
    });
    return;
}

function getRatio(pic) {
    var width = getWidth(pic);
    var height = getHeight(pic);
    return width / height;
}

function resize(pic) {
    // 274/200 = 1.37
    // x < 1.37 means too tall
    var ratio = getRatio(pic);
    // Return if img is correct ratio
    if (ratio == 1.37) return;
    // Resize if img is too tall
    if (ratio < 1.37) {
        // Set max-width and reset max height
        $(pic).css('max-height', "999px");
        $(pic).css('max-width', "var(--entry-width)");
        return;
    }
}
/*
 * Switch between the default overlay classes and the classes for tall entries. 0: wide to tall; otherwise: tall to wide
 */
function wideToTall(num) {
    // Replace default classes with tall classes
    if (num == 0) {
        $('#overlay .entry-container').removeClass('entry-container').addClass('tall-entry-container');
        $('#overlay .img-container').removeClass('img-container').addClass('tall-img-container');
        $('#overlay .desc-container').removeClass('desc-container').addClass('tall-desc-container');
        $('#overlay img').addClass('tall-img');
        $('#overlay video').addClass('tall-video');
    }
    // Revert back to default classes
    else {
        $('#overlay .tall-entry-container').removeClass('tall-entry-container').addClass('entry-container');
        $('#overlay .tall-img-container').removeClass('tall-img-container').addClass('img-container');
        $('#overlay .tall-desc-container').removeClass('tall-desc-container').addClass('desc-container');
        // Reset img css
        $('#overlay img').removeClass('tall-img');
        $('#overlay video').removeClass('tall-video');
    }
    return;
}

function expandEntry(entry) {
    // Revert tall classes back to default if necessary
    if ($('.tall-entry-container').length != 0) {
        wideToTall(1);
    }
    // Reset overlay by hiding all content
    $('#overlay').find('video').css('display', "none");
    $('#overlay').find('img').css('display', "none");
    $('#overlay').find('iframe').css('display', "none");
    // Check if video/pdf exists
    var video = $(entry).closest('li').find('video');
    var pdf = $(entry).closest('li').find('iframe');
    /* ENTRIES WITH VIDEO DEMO */
    if ($(video).length > 0) {
        var vidSrc = $(video).find('source').attr('src');
        $('#overlay').find('video').attr('src', vidSrc);
        $('#overlay').find('video').css('display', "");
    }
    /* ENTRIES WITH PDF */
    else if ($(pdf).length > 0) {
        var pdfSrc = $(pdf).attr('src');
        $('#overlay').find('iframe').attr('src', pdfSrc);
        $('#overlay').find('iframe').css('display', "");
    }
    /* FOR ENTRIES WITHOUT VIDEO DEMO */
    else {
        // Get pics
        var pic = $(entry).closest('li').find('img');
        var expandedPic = $('#overlay img');
        // Copy and paste source
        var picSrc = pic.attr('src');
        expandedPic.attr('src', picSrc);
        // Resize if img is too tall
        if (getRatio(pic) < 1.37) {
            // Replace classes with tall classes
            wideToTall(0);
        }
        // Show
        expandedPic.css('display', "");
    }
    /* FOR ENTRIES WITH VISIT BUTTON */
    var visit = $(entry).closest('li').find('.visit a');
    if ($(visit).length > 0) {
        var url = $(visit).attr('href');
        $('#overlay .visit a').attr('href', url);
        $('#overlay .visit').show();
    }
    else $('#overlay .visit').hide();
    /* DESCRIPTION */
    // Update title
    var title = $(entry).closest('li').find('h2').text();
    $('#overlay h2').replaceWith('<h2>' + title + '</h2>');
    // Update date
    var date = $(entry).closest('li').find('.date').text();
    $('#overlay .date').replaceWith('<p class="date">' + date + '</p>');
    // Update description
    var description = $(entry).closest('li').find('.small').text();
    $('#overlay .small').replaceWith('<p class="small">' + description + '</p>');
    // Fade in and out
    $('#overlay').css('display', '');
    $('#overlay').fadeIn(150);
    // Disable scroll
    $('body').attr('scroll', 'no');
    $('body').css('overflow', 'hidden');
}
var main = function () {
    $('body').css('background-color', '#fff');
    // Center each portfolio img
    $('#portfolio li').each(function () {
        //offset($(this).find('img'), $('.img-container'));
        //  offset($(this).find('img'));
        resize($(this).find('img'));
    });
    // Resume circle animation
    $('.circle').hover(function () {
        $(this).effect('shake', {
            times: 2
            , distance: 3
        }, 400);
    });
    /* MENU CLICK */
    $('nav li').click(function () {
        navClick(this);
        return;
    });
    /* HOME: SEE MORE LINKS */
    $('.sm-work').click(function () {
        portfolio();
        $('html,body').scrollTop(0);
        return;
    });
    $('.sm-resume').click(function () {
        resume();
        $('html,body').scrollTop(0);
        return;
    });
    /* WORK PREVIEW LINKS */
    $('#work-preview img:nth-child(1)').click(function () {
        expandEntry($('#portfolio li:nth-child(1)'));
    });
    $('#work-preview img:nth-child(2)').click(function () {
        expandEntry($('#portfolio li:nth-child(2)'));
    });
    /* PORTFOLIO EXPAND: expand button */
    $('#portfolio .expand').click(function () {
        expandEntry(this);
        return;
    });
    /* PORTFOLIO EXPAND: img click */
    $('#portfolio img').click(function () {
        expandEntry(this);
        return;
    });
    /* PORTFOLIO CLOSE */
    $('.close').click(function () {
        $('#overlay').fadeOut(150);
        $('body').attr('scroll', '');
        $('body').css('overflow', '');
    });
};
$(document).ready(main);
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
    if ($(link).hasClass('logo') === true) {
        location.reload();
        return;
    }
    if ($(link).hasClass('contact-link') === true) {
        contact();
        return;
    }
    // Return if active nav was clicked on
    if ($(link).hasClass('active-nav') === true) {
        return;
    }
    // Update active page
    if ($(link).hasClass('about-link') === true) about();
    else if ($(link).hasClass('work-link') === true) work();
    else if ($(link).hasClass('resume-link') === true) resume();
    return;
}

function nav(page) {
    if (page === "" || page != about || page != work || page != resume) {
        page = about;
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
    if (page === "about") $('body').css('background-color', '#fff');
    else $('body').css('background-color', 'white');
    return;
}

function about() {
    // Update active nav pointer
    $('.active-nav').removeClass('active-nav');
    $('.about-link').addClass('active-nav');
    // Fade out old page
    $('.active').hide().removeClass('active');
    $('#about').addClass('active');
    // Fade in new active page
    $('.active').show();
    // Update background color
    $('body').css('background-color', '#fff');
    return;
}

function work() {
    // Update active nav pointer
    $('.active-nav').removeClass('active-nav');
    $('.work-link').addClass('active-nav');
    // Fade out old page
    $('.active').hide().removeClass('active');
    $('#work').addClass('active');
    $('#work').css('display', '');
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
    //alert(window.innerWidth);
    $(window).resize(function () {
        // Resize nav
        if (window.innerWidth <= 860) {
            $('#header li').each(function () {
                $(this).addClass('s860');
            });
        }
        else {
            $('#header li').each(function () {
                $(this).removeClass('s860');
            });
        }
        if (window.innerWidth <= 730) {
            $('#menu-container').each(function () {
                $(this).addClass('s730');
            });
        }
        else {
            $('#menu-container').each(function () {
                $(this).removeClass('s730');
            });
        }
        // Resize work
        if (window.innerWidth <= 724) {
            $('#work').each(function () {
                $(this).addClass('s724');
            });
        }
        else {
            $('#work').each(function () {
                $(this).removeClass('s724');
            });
        }
    });
    // $('body').css('background-color', '#fff');
    // Center each gallery img
    $('#work li').each(function () {
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
        work();
        $('html,body').scrollTop(0);
        return;
    });
    $('.sm-resume').click(function () {
        resume();
        $('html,body').scrollTop(0);
        return;
    });
    /* WORK PREVIEW LINKS */
    $('#work-preview li:nth-child(1)').click(function () {
        expandEntry($('#work li:nth-child(1)'));
    });
    $('#work-preview li:nth-child(2)').click(function () {
        expandEntry($('#work li:nth-child(2)'));
    });
    /* work EXPAND: expand button */
    $('#work .expand').click(function () {
        expandEntry(this);
        return;
    });
    /* work EXPAND: img click */
    $('#work img').click(function () {
        expandEntry(this);
        return;
    });
    /* work CLOSE */
    $('.close').click(function () {
        $('#overlay').fadeOut(150);
        $('body').attr('scroll', '');
        $('body').css('overflow', '');
    });
};
$(document).ready(main);
/*global $ */
/*jslint node: true*/
/*
 * Return width of obj
 */
function getWidth(obj) {
    var clone = obj.clone();
    clone.css("visibility", "hidden");
    $('body').append(clone);
    var width = clone.outerWidth();
    clone.remove();
    return width;
}
/*
 * Return height of obj
 */
function getHeight(obj) {
    var clone = obj.clone();
    clone.css("visibility", "hidden");
    $('body').append(clone);
    var height = clone.outerHeight();
    clone.remove();
    return height;
}
/*
 * Check which button was clicked on and appropriately switch active classes
 */
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
    if ($(link).hasClass('home-link') === true) home();
    else if ($(link).hasClass('work-link') === true) work();
    else if ($(link).hasClass('resume-link') === true) resume();
    return;
}
/*
 * Go to the inputed page
 */
function nav(page) {
    if (page === "" || page != home || page != work || page != resume) {
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
/*
 * Go to home
 */
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
/*
 * Go to work
 */
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
/*
 * Go to resume 
 */
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
/*
 * Animation for contact button
 */
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
/*
 * Return ratio of img
 */
function getRatio(pic) {
    var width = getWidth(pic);
    var height = getHeight(pic);
    return width / height;
}
/*
 * Add tall class to appropriate images
 */
function resize(pic) {
    // 274/200 = 1.37
    var ratio = getRatio(pic);
    // Return if img is correct ratio
    if (ratio == 1.37) return;
    // Resize if img is too tall
    if (ratio < 1.37) {
        $(pic).addClass('tall');
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
    var description = $(entry).closest('li').find('.small-p').text();
    $('#overlay .small-p').replaceWith('<p class="small-p">' + description + '</p>');
    // Fade in and out
    $('#overlay').css('display', '');
    $('#overlay').fadeIn(150);
    // Disable scroll
    $('body').attr('scroll', 'no');
    $('body').css('overflow', 'hidden');
}

function sizeClasses(width) {
    // Small header
    if (width <= 1035) {
        $('#header ul').addClass('small');
    }
    else {
        $('#header ul').removeClass('small');
    }
    // Small bio / smaller header
    if (width <= 674) {
        $('#bio .container').addClass('small');
        $('#header ul').addClass('smaller');
        $('.content').css('margin-top', '155px');
    }
    else {
        $('#bio .container').removeClass('small');
        $('#header ul').removeClass('smaller');
        $('.content').css('margin-top', '200px');
    }
    // Hide logo text / small work
    if (width <= 884) {
        $('.logo:nth-child(2)').hide();
        $('#work li').addClass('small');
    }
    else {
        $('.logo:nth-child(2)').show();
        $('#work li').removeClass('small');
    }
    // Small work preview / smaller work
    if (width <= 550) {
        $('#work-preview li').addClass('small');
        $('#work li').addClass('smaller');
    }
    else {
        $('#work-preview li').removeClass('small');
        $('#work li').removeClass('smaller');
    }
    // Small resume preview
    if (width <= 1120) $('#resume-preview li').addClass('small');
    else $('#resume-preview li').removeClass('small');
    // Smaller resume preview
    if (width <= 920) $('#resume-preview li').addClass('smaller');
    else $('#resume-preview li').removeClass('smaller');
    // Smallest resume preview
    if (width <= 762) $('#resume-preview li').addClass('smallest');
    else $('#resume-preview li').removeClass('smallest');
    return;
}
var main = function () {
    //alert(window.innerWidth);
    // Apply appropriate size classes
    sizeClasses(window.innerWidth);
    // Switch out size classes on window resizes
    $(window).resize(function () {
        sizeClasses(window.innerWidth);
    });
    // Check for tall gallery images and resize
    $('#work li').each(function () {
        resize($(this).find('img'));
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
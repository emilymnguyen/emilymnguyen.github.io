/*global $ */
/*jslint node: true*/



function getWidth(obj){
    var clone = obj.clone();
    clone.css("visibility","hidden");
    $('body').append(clone);
    var width = clone.outerWidth();
    clone.remove();
    return width;
}

function getHeight(obj){
    var clone = obj.clone();
    clone.css("visibility","hidden");
    $('body').append(clone);
    var height = clone.outerHeight();
    clone.remove();
    return height;
}

function offset(pic, container) {
    var width = getWidth(pic);
    var height = getHeight(pic);
    var cWidth = getWidth(container);
    var cHeight = getHeight(container);
    
    if (width >= height) {
        pic.css('height', cHeight);
        width = getWidth(pic);
        var offset = -(width - cWidth)/2;      
        pic.css('margin-left', offset);
    }
    else {
        pic.css('width', cWidth);
        height = getHeight(pic);
        var offset = -(height - cHeight)/2;      
        pic.css('margin-top', offset);
    }
}

function isIE() 
{
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0) // If Internet Explorer, return version number
    
        return true;
    
    else  // If another browser, return 0
    
       return false;
    
}

function contact() {
    $('html, body').animate({ 
            scrollTop: $(document).height()-$(window).height()-5}, 300).promise().then(function() {
               
                $('.icon').effect('shake', {times:1, distance: 7, direction: 'left'}, 200);
            }); 
    return;
}


function goTo(link) {
     if ($(link).hasClass('contact-link') === true) {
            contact(); 
            return;
        }
        // Return if active nav was clicked on
        if ($(link).hasClass('active-nav') === true) {
            return;
        }
        
        // Update active page
        if ($(link).hasClass('home-link') === true) 
            home();
        else if ($(link).hasClass('portfolio-link') === true) 
            portfolio();
        else if ($(link).hasClass('resume-link') === true)
            resume();
        return;
}

/*
function goTo(page) {
    var pageClass = "." + page;
    var pageID = "#" + page;
    
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
    if (page === "home")
        $('body').css('background-color','#f2f2f2');
    else
        $('body').css('background-color','white');
    return;
} */

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
    $('body').css('background-color','#f2f2f2');
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
    $('body').css('background-color','white');
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
    $('body').css('background-color','white');
    return;
}
    
function expandEntry(entry) {
     // Get pics
        var pic = $(entry).closest('table').find('img');
        var expandedPic = $('#portfolio-expand img');
        
        // Get src and sync expanded photo
        var picSrc = pic.attr('src');
        expandedPic.attr('src', picSrc);
        
        // Center
        offset(expandedPic, $('#portfolio-expand .e-img-container'));
        
        /* DESCRIPTION */
        // Update title
        var title = $(entry).closest('table').find('h2').text();
        $('#portfolio-expand h2').replaceWith('<h2>'+title+'</h2>');
        
        // Update date
        var date = $(entry).closest('table').find('.date').text();
        $('#portfolio-expand .date').replaceWith('<p class="date">'+date+'</p>');
        
        // Update description
        var description = $(entry).closest('table').find('.small').text();
        $('#portfolio-expand .small').replaceWith('<p class="small">'+description+'</p>');
        
         // Fade in and out
        $('#screen').css('display', '');
        $('#screen').fadeIn(150);
}

var main = function () {
    var hash = location.hash;
  //  getPage(hash);
    
    $('body').css('background-color', '#f2f2f2');
    
    // Center each portfolio img
    $('#portfolio li').each(function () {
        offset($(this).find('img'), $('.img-container'));
    });
    
    // Resume circle animation
    $('.circle').hover(function () {
        $(this).effect('shake', {times:2, distance: 3}, 400 );
    });
    
    /* MENU CLICK */
    $('nav li').click(function () {
        goTo(this);
        return;
    });
    
    /* HOME LINKS */
    $('.expand-resume').click(function () {
       resume();
        $('html,body').scrollTop(0);
        return;
    });
    
    $('.expand-portfolio').click(function () {
       portfolio();
        $('html,body').scrollTop(0);
        return;
    });
     
    /* PORTFOLIO EXPAND */
    $('#portfolio .expand').click(function () {
        expandEntry(this);
        return;
       
    });
    
    /* PORTFOLIO CLOSE */
    $('.close').click(function () {
        $('#screen').fadeOut(150);
    });
     
};


$(document).ready(main);

        
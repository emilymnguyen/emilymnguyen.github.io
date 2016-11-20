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

var main = function () {
    /*
    // Center each portfolio img
    $('#portfolio li').each(function () {
        offset($(this).find('img'), $('.img-container'));
    }); */
    
    jQuery(window).load(function () {
        $('#portfolio li').each(function () {
        offset($(this).find('img'), $('.img-container'));
    });
    });
}

$(document).ready(main);
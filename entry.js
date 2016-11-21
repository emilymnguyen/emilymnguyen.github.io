 /*<li>
             <div class="entry">
             <div class="img-container"><img src="http://www.newyorker.com/wp-content/uploads/2016/04/Larson-Game-of-Thrones-Returns-1200.jpg"></div>
             <h2>Lorem Ipsum Dolor</h2>
                     <p class="date">September 5, 2016</p>
                    
                     <p class="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim velit non elit mattis, id bibendum justo posuere.<span class="extra"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim velit non elit mattis, id bibendum justo posuere.</span>
</p> </div>
                 <div class="expand"><a>Expand +</a></div>    
         </li>*/

function createEntry(image, title, date, description, extra) {
    $('#portfolio ul').prepend(
    $('<li>').append(
        $('<div>').attr('class','entry').append(
            $('<div>').attr('class', 'img-container').append('<img>').attr('src',image),
            $('<h2>').append(title),
            $('<p>').attr('class','date').append(date),
            $('<p>').attr('class','small').append(
                description, $('<span>').attr('class','extra').append(" "+extra)
            )),
        $('<div>').attr('class','expand').append("Expand +")
        )
    );
}

var main = function () {
    alert("hi");
    createEntry('http://www.newyorker.com/wp-content/uploads/2016/04/Larson-Game-of-Thrones-Returns-1200.jpg', "Title", "November 20, 2016", "Lorem ipsum.", "Extra text.");
    alert("bye");
};

$(document).ready(main);
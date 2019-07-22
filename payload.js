alert("Hello world");

var images = $('.thumbnailArrows').children('img').map(function(){
    return $(this).attr('src')
}).get()

alert(images);

chrome.runtime.sendMessage(images);

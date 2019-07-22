var images = new Array();
$("img").each(function(){
images.push($(this).attr('src'));
})

chrome.runtime.sendMessage(images);

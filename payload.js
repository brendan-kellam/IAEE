var images = new Array();
    $("img").each(function(){
        var imgSrc = $(this).attr('src');
        images.push(imgSrc);
        if (/^(.*)(\.png|\.jpg|\.jpeg)$/.test(imgSrc))
        {
            //$(this).attr('alt', $(this).attr('alt') + '. Hello world!');

            alert($(this).width());

            if ($(this).width() > 50 && $(this).height() > 50)
            {
                alert("here");
                CognitiveServicesAPI.getImageDescription($(this), function(firstCaption, imgRet)
                {
                    alert(firstCaption);
                    imgRet.attr('alt', imgRet.attr('alt') + '. ' + firstCaption);
                }, 
                function(ErrorMsg)
                {
                    alert(ErrorMsg);
                });
            }
        }
        
        // CognitiveServicesAPI.getImageDescription(imgSrc, function(firstCaption)
        // {
        //     alert(firstCaption);
        // }, 
        // function(ErrorMsg)
        // {
        //     alert(ErrorMsg);
        // });
})

chrome.runtime.sendMessage(images);

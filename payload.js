chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == "describe_images") {
        console.log("Describing images...");
        
        $("img").each(function() {
            var imgSrc = $(this).attr("src");
            if ($(this).width() > 50 && $(this).height() > 50)
            {
                CognitiveServicesAPI.getImageDescription($(this),
                    function(firstCaption, imgRet)
                    {
                        imgRet.attr("alt", (imgRet.attr('alt') || "") + ". " + firstCaption);
                        console.log(firstCaption);
                    },
                    function(errorMsg)
                    {
                        console.log(errorMsg)
                    }
                );
            }
        });
        
        sendResponse("Done");
    }
});

var images = new Array();

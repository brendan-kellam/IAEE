var describedImages = [];

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == "describe_images") {
        console.log("Activating image descriptions");
        
        $("img").each(function() {
            var imgSrc = $(this).attr("src");
            if ($(this).width() > 50 && $(this).height() > 50)
            {
                // Wrap the images with anchor tags to enable them focusing
                $(this).wrap("<a href='#'></a>");
            }
        });

        $("a").focus(function() {
            var images = $(this).find("img");
            if (images.length > 0)
            {
                console.log("Image focused");
                
                images.each(function() {
                    if (!describedImages.includes($(this)[0]))
                    {
                        if ($(this).width() > 50 && $(this).height() > 50)
                        {
                            console.log("Sending Cognitive Services API request");
                            CognitiveServicesAPI.getImageDescription($(this),
                                function(firstCaption, imgRet)
                                {
                                    imgRet.attr("alt", (imgRet.attr('alt') || "") + ". " + firstCaption);
                                    describedImages.push(imgRet[0]);
                                    console.log(firstCaption);
                                },
                                function(errorMsg)
                                {
                                    console.log(errorMsg)
                                }
                            );
                        }
                    }
                    else
                    {
                        console.log("Image already described");
                    }
                });
            }
        });
        
        sendResponse("Done");
    }
});
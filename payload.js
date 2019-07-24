var describedImages = [];

var realFocus = false;

var inject = function()
{
    console.log("Activating image descriptions");

    $("img").each(function() {
        var imgSrc = $(this).attr("src");
        if ($(this).width() > 50 && $(this).height() > 50)
        {
            // Wrap the images with anchor tags to enable them focusing
            if ($(this).parent().is("a"))
            {
                $(this).parent().addClass("IAEE");
            }
            else
            {
                $(this).wrap("<a class='IAEE' href=''></a>");
            }
        }
        $(this).attr("alt", "");
    });
    
    $(".IAEE").on({
        focus: function() {
            if (!realFocus)
            {
                $(this).blur();
                console.log("blur");
            }
        }
    });

    $(".IAEE").focus(function(event) {
        if (realFocus)
        {
            console.log("Real Focus");
            realFocus = false;
            return;
        }

        var images = $(this).find("img");
        if (images.length > 0)
        {
            console.log("Loading description...");
            
            images.each(function() {
                if (!describedImages.includes($(this)[0]))
                {
                    if ($(this).width() > 50 && $(this).height() > 50)
                    {
                        console.log("Sending Cognitive Services API request");
                        describedImages.push($(this)[0]);

                        CognitiveServicesAPI.getImageDescription($(this),
                            function(firstCaption, imgRet)
                            {
                                // imgRet.attr("alt", (imgRet.attr('alt') || "") + ". " + firstCaption);
                                imgRet.attr("alt", firstCaption);
                                console.log(firstCaption);
                                setTimeout(function() {
                                    realFocus = true;
                                    $(imgRet).parent().focus();
                                }, 100);
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
                    realFocus = true;
                    $(this).parent().focus();
                }
            });
        }
        else
        {
            console.log("No images under <a> tag");
        }
    });
    
    console.log("Done");
}

inject();

// chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
//     if (msg.action == "describe_images") {
//         inject();
//         sendResponse("Done");
//     }
// });
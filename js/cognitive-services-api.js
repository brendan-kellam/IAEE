var CognitiveServicesAPI = new function()
{
    this.API_KEY = "1cdddeac21274c66a7e5e9ea435af458";
    var URI_BASE = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";

    var PARAMS = {
        "visualFeatures": "Description",
        "details": "",
        "language": "en",
    };

    this.getImageDescription = function (image, onSuccess, onError)
    {
        $.ajax({
            url: URI_BASE + "?" + $.param(PARAMS),
            
            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader(
                    "Ocp-Apim-Subscription-Key", CognitiveServicesAPI.API_KEY);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + image.attr('src') + '"}',
        })

        .done(function(data) {
            var captions = data["description"]["captions"];
            
            if (captions.length > 0)
            {
                var firstCaption = captions[0]["text"];
                onSuccess(firstCaption, image);
            }
            else
            {
                onError("No captions found.");
            }
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " :
                errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" :
                jQuery.parseJSON(jqXHR.responseText).message;
            onError(errorString);
        });
    };
};
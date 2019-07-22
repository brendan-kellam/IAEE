var CognitiveServicesAPI = new function()
{
    this.API_KEY = "";
    var URI_BASE = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";

    var PARAMS = {
        "visualFeatures": "Description",
        "details": "",
        "language": "en",
    };

    this.getImageDescription = function (imageUrl, onSuccess, onError)
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
            data: '{"url": ' + '"' + imageUrl + '"}',
        })

        .done(function(data) {
            var captions = data["description"]["captions"];
            
            if (captions.length > 0)
            {
                var firstCaption = captions[0]["text"];
                onSuccess(firstCaption);
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
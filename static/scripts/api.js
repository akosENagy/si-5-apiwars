var app = app || {};

app.APIHandler = {

    getAPIData: function(apiUrl, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', apiUrl.replace("http" , "https"), true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) { // successful response
                var data = JSON.parse(request.responseText);
                callback(data); 
            }
        };  
        request.send();
    },
}
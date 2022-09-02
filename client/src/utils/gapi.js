
function loadClient() {
    gapi.client.setApiKey("AIzaSyCCB5k_U80mBg8RoYhVgFCJ3t3xjKQAr1w");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "maxResults": 5,
      "q": "surfing"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  function gapiLoad(){

      gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: "18194820958-kvckajo32dgl0mc62v81drkhl1ofhtdq.apps.googleusercontent.com"});
      });

  }

  export {loadClient, execute,gapiLoad}
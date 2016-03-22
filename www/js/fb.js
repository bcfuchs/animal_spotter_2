
      document.addEventListener("deviceready",onDeviceReady,false);


      function onDeviceReady() {
         console.log("goooo...");
     //    oa();
      }


      function oa() {
        $('#token').html("Waiting...");
        var fbLoginSuccess = function (userData) {
           $('#token').html(JSON.stringify(userData));
      };

      facebookConnectPlugin.login(["publish_actions"],
				  fbLoginSuccess,
				  function (error) { alert("" + error); });


}
function logme(m) {

    $('#token').append("<div>"+m+"</div>");
}


function uploadPhoto() {
    var requestPath = "/me/permissions";
    var success = function(e) { logme(JSON.stringify(e))};
    var failure = function(e) { logme("fail: " + JSON.stringify(e))};
    facebookConnectPlugin.api(requestPath, [], success, failure);
	testPhoto();
}
function testPermissions() {
    var requestPath = "/me/permissions";
    var success = function(e) { logme(JSON.stringify(e))};
    var failure = function(e) { logme("fail: " + JSON.stringify(e))};
    facebookConnectPlugin.api(requestPath, [], success, failure)
}

function testPhoto() {
facebookConnectPlugin.showDialog( 
    {
        method: "feed",
        picture:'https://www.google.co.jp/logos/doodles/2014/doodle-4-google-2014-japan-winner-5109465267306496.2-hp.png',
        name:'Test Post',
        message:'First photo post',    
        caption: 'Testing using phonegap plugin',
        description: 'Posting photo using phonegap facebook plugin'
    }, 
    function (response) { alert(JSON.stringify(response)) },
    function (response) { alert(JSON.stringify(response))}
      );
 }

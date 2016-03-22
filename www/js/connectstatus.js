document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    var selector = "#con-table";
    //    alert('ready');
    checkConnection(selector);
    offliner();
}

function checkConnection(selector) {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    $(selector).html('Connection type: ' + states[networkState] + " " + networkState);
    
}

function offliner() {
document.addEventListener("offline", function() {
	alert("No internet connection");
    }, false);

document.addEventListener("online", function() {
	alert("Got an internet connection!");
    }, false);

}
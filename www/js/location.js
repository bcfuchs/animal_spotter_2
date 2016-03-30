
! function() {

//storage_get('anspot','species-type',function(d){ make_title(d) });

var location = function(cb){

    var onSuccess = function(position) {

 cb('Latitude: '          + position.coords.latitude          + ', ' +
 'Longitude: '         + position.coords.longitude         + ', ' +
 'Altitude: '          + position.coords.altitude          + ', ' +
 'Accuracy: '          + position.coords.accuracy          + ', ' +
 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + ', ' +
 'Heading: '           + position.coords.heading           + ', ' +
 'Speed: '             + position.coords.speed             + ', ' +
 'Timestamp: '         + position.timestamp                + ', ',position);

}
 var onError = function(error) {
  cb('code: '    + error.code    + ', ' +
  'message: ' + error.message + ', ');
 }

  navigator.geolocation.getCurrentPosition(onSuccess, onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });

}



    var _location_handler = function(zoomFactor,mapSel,msgSel){
	return function(m,pos) {
	    console.log("finding location 2");
	    var lon = pos.coords.longitude;
	    var lat = pos.coords.latitude;
	    var location = {lat:lat,lon:lon}
            var map = new GMaps({
		div: mapSel,
		lat: lat,
		lng: lon,
		zoom: zoomFactor,
            });
	    map.addMarker({
		lat: lat,
		lng: lon,
		title: 'Sighting',
		click: function(e) {
		    // info about sighting. 
		    alert('This sighting');
		}
	    });

	    var e = $.Event('mapLoaded');
	    $(window).trigger(e);
	    
            $(msgSel).html(m)
            storage_put('anspot',{key:'location',value:location},function(d){console.log(d)});
	}

};
    window.onMapsApiLoaded = function() {
	    console.log("called onMapsApiLoaded!@");
	document.addEventListener("deviceready", function() {
	    var zoomFactor = 8;
	    var mapSel = "#map";
	    var msgSel = "#loc";
	    
	
	    location(_location_handler(zoomFactor,mapSel,msgSel));
	},false);
	}
    
    
    document.addEventListener("deviceready", function() {


	footer_show_on_click();
	
	

	

    },false);


}()

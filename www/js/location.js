
! function() {

    var location_unavailable_handler =  function(){

	cordova.plugins.settings.openSetting("location_source",
					     function(){
						 console.log("opened location settings");
						 // this probably won't work
						 // we need callback on complete. 
						 window.location.href = "location.html";
								   },
					     function(){console.log("failed to open location settings")});

    }

    var location = function(success,onError) {

	var onSuccess = function(position) {

	    success('Latitude: '          + position.coords.latitude          + ', ' +
	       'Longitude: '         + position.coords.longitude         + ', ' +
	       'Altitude: '          + position.coords.altitude          + ', ' +
	       'Accuracy: '          + position.coords.accuracy          + ', ' +
	       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + ', ' +
	       'Heading: '           + position.coords.heading           + ', ' +
	       'Speed: '             + position.coords.speed             + ', ' +
	       'Timestamp: '         + position.timestamp                + ', ',position);

	}

	if ('geolocation' in navigator) {
	    navigator.geolocation.getCurrentPosition(onSuccess, onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
	}
	else {
	    // warn to turn it on
	    console.log("no geo!!!");
	    // then show the next step
	}

    }


    var _error_handler = function(e){
	var log = function(m) {console.log(m)}
	// error.code can be:
	//   0: unknown error
	//   1: permission denied
	//   2: position unavailable (error response from locaton provider)
	//   3: timed out
	var err = e.code;
	
	switch(err) {

	case 1:
	    console.log("permission denied");
	    break;
	case 2:
	    log("position unavailable");
	    //window.plugins.toast.show('Please enable location','short','center',log,log);
	    location_unavailable_handler();
	    break;
	case 3:
	    log("timeout");
//	    window.plugins.toast.show('Please enable location','short','center',log,log);
	    location_unavailable_handler();
	    break;
	    

	}
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

    
  //  window.onMapsApiLoaded = function() {
	console.log("called onMapsApiLoaded!@");
	document.addEventListener("deviceready", function() {
	    var zoomFactor = 8;
	    var mapSel = "#map";
	    var msgSel = "#loc";
	    
	    
	    location(_location_handler(zoomFactor,mapSel,msgSel),_error_handler);
	},false);
    //}
    
    
    document.addEventListener("deviceready", function() {


	footer_show_on_click();
	
	

	

    },false);


}()

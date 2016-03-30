
! function() {
    $(document).on('deviceready',function(){
	var do_summary,save_sighting;
	do_summary = function() {
	    // closure for making summary card. 
	    var make_summary = function(t,d){
		var content,sel,dvalue;
		sel = "#"+t;
		content = "";
		dvalue = "";
		// in case some stuff is missing
		try {
		    content = d.value;
		    dvalue = d.value;
		}
		catch(e) {
		    console.log(e);
		}
		    if (t === 'time') {
		    var hms = new Date(content).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
		    content  = (new Date(content)).toDateString() + " " + hms;
		    
		}
		if (t === "location") {
		    content = content.lat + " " + content.lon;

		}
		if (t === "observations") {
		    content = format_observations_html(dvalue,"sighting-card");
		}
		
		$(sel).data('s-data',dvalue);
		$(sel).attr('data-sighting-type',t);
		if (t === 'photo') {
		    if (dvalue !== "") {
			$(sel).find('img').attr('src',dvalue);
		    }
		    else {
			$(sel).find('img').hide();
		    }
		}
		else {
		    $(sel).find(".content").html(content);
		}
	    }

	    storage_get('anspot','time',function(d){ make_summary('time',d) });
	    storage_get('anspot','species-type',function(d){ make_summary('species-type',d) });
	    storage_get('anspot','species',function(d){ make_summary('species',d) });
	    storage_get('anspot','location',function(d){ make_summary('location',d) });
	    storage_get('anspot','observations',function(d){ make_summary('observations',d) });
	    storage_get('anspot','photo',function(d){ make_summary('photo',d) });


	}

	save_sighting = function(){
	    $("#save-sighting").click(function(){
		var add_to_sighting = function(){
		    var sighting = {}

		    $("[data-sighting-type]").each(function(){

			var datakey = $(this).attr('data-sighting-type');
			var data = $(this).data('s-data');   
			sighting[datakey] = data;
                    });
		    
		    sighting.key = Date.now();
                    storage_put('sightings',sighting,function(d){console.log(d)});  
		}
		add_to_sighting();
		window.location.href = $(this).attr("data-next");
	    });
	    
	}

	do_summary();
	// save the data to sightings
	save_sighting();

    });

}()

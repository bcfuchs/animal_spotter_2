
! function() {
    $(document).on('deviceready',function(){
	var do_summary,save_sighting;
	do_summary = function() {
	    var make_summary = function(t,d){
		var sel = "#"+t;
		console.log(t);
		$(sel).html(JSON.stringify(d.value));
		$(sel).data('s-data',d.value);
		$(sel).attr('data-sighting-type',t);
		
	    }

	    storage_get('anspot','time',function(d){ make_summary('time',d) });
	    storage_get('anspot','species-type',function(d){ make_summary('species-type',d) });
	    storage_get('anspot','species',function(d){ make_summary('species',d) });
	    storage_get('anspot','location',function(d){ make_summary('location',d) });
	    storage_get('anspot','observations',function(d){ make_summary('observations',d) });


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

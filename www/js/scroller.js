! function() {
    $(document).on('deviceready',function(){

	var init_InfScroll = function(){
	    var cnt = 0;
	    var max = 5;
	    var add_els = function(top,sel,n) {
		var els = []
		if (cnt < max ) {
		    for (var i = 0; i < n;i++) {

			$(top).append($(sel).clone().html("new div " + i + " " + cnt));
		    }
		}
		cnt = cnt +1;
	    }
	    add_els = function(top) {
		
	    }
	    
	    infScroller("#scroll-1",function(){add_els('#scroll-1','#cloner',10)});   
	}
	var build_card_summary = function(el,species,date,image) {
	    
	    $(el).find(".sighting-card-summary .date-sum").html(date);
	    $(el).find(".sighting-card-summary .species-sum").html(species);
	    if (image !== null) {
		$(el).find(".sighting-card-summary .photo-sum img").attr('src',"data:image/jpeg;base64," + image);
	    }
	}
	var format_observations = function(obs) {
	    var out = $("<div></div>");
	    console.log(obs);
	    for (var i =0; i < obs.length; i++) {
		console.log(obs[i].name);
		var label = $("<span></span>").html(obs[i].name).addClass("obs-label");
		var content = $("<span></span>").html(obs[i].value).addClass('obs-content');
		var div = $("<div></div>").append(label).append(content);
		out.append(div);
	    }
	    console.log(out);
	    return out

	}
	var build_card = function(el,species,date,observations,location,id) {

	    observations = format_observations(observations);

	    $(el).find(".time .content").html(date);
	    $(el).find(".location .content").html(location);
	    $(el).find(".observations .content").html(observations);
	    $(el).find(".species .content").html(species);
	    $(el).attr('data-sighting-id',id);

	}
	
	var test_get_sightings  = function(cloneSel,listSel){

	    var log = function(m){console.log(m)}

	    var load_sighting = function(d,i,max){

		// time indicates complete entry
		if ("time" in d) {

		    // format the data
		    var el = $(cloneSel).clone().removeAttr('id').removeClass('hideme');
		    var hms = new Date(d.time).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
		    var date = (new Date(d.time)).toDateString() + " " + hms;
		    var location = d.location.lat + " " + d.location.lon;
		    var species = d.species;
		    var observations = d.observations;
		    var photo = d.photo;
		    var id = d.time;
		    
		    // summary card
		    build_card_summary(el,d.species,date,photo);

		    // card							   
		    build_card(el,species,date,observations,location,id);

		    // add to top of list
		    $(listSel).prepend(el);

		    // add active if top item
		    if (i === max) {
			$(el).addClass("active");
		    }
		}
	    }
	    
	    var proc = function (d) {
		var handler = function(i,max) {
		    log("handler " + i + ' ' + max);
		    return function(d){

			load_sighting(d,i,max)}

		};

		for (var i = 0; i < d.length; i++) {
		    log("gettinga sighting...");
		    var a = i + 0;
//		    storage_get('sightings',d[i],function(data){ load_sighting(data,i,d.length)});
		    var loader = handler(a,d.length-1);
		    storage_get('sightings',d[i],loader);

		}

	    }
	    storage_keys('sightings',proc);
	    
	} // var test_get_sightings

	// display the extended card on click
	var display_card = function(){
	    $('.sighting-card-container').each(function(){
		
		$(this).click(function(){
		    var expanded = $(this).data("expanded");

		    if (expanded === false) {

			// for if we want a separate page for editing...
			var id = $(this).data("data-sighting-id");

			// hide rest, show this one
			$('.sighting-card-container').not(this).addClass('hide-sighting-card');

			// remove the active indicator
			$(this).removeClass("active"); 
			console.log(this);
		    	// expand the div show the controls. 
			$(this).find(".hideme").removeClass('hideme');

			
			$(this).addClass('sighting-card-expanded');
		    	// close the expanded card on click
			$(this).data("expanded",true);
		    }
		    else {


			$(this).removeClass('.sighting-card-expanded');
			$(this).find(".sighting-card").addClass("hideme");
			$('.sighting-card-container').removeClass("active");
			$(this).addClass("active"); 
			$(this).data("expanded",false);
			$('.sighting-card-container').removeClass('hide-sighting-card');
		    }
		    

		})
	    })

	}
	init_InfScroll();
	test_get_sightings('#cloner','#scroll-1');
	display_card();
    });
}()


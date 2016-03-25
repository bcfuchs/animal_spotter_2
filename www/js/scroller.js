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
	var build_card_summary = function(el,species,date) {
	    $(el).find(".sighting-card-summary .date-sum").html(date);
	    $(el).find(".sighting-card-summary .species-sum").html(species);

	}

	var build_card = function(el,species,date,observations,location,id) {
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
		    var observations = JSON.stringify(d.observations);
		    var id = d.time;
		    
		    // summary card
		    build_card_summary(el,d.species,date);

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
	var display_card = function(){
	    $('.sighting-card-container').each(function(){
		$(this).click(function(){
		    // for if we want a separate page for editing...
		    var id = $(this).attr("data-sighting-id");
		    // hide rest, show this one
		    $('.sighting-card-container').not(this).addClass('hide-sighting-card');
		    		    // expand the div show the controls. 
		    $(this).find(".final").removeClass('hideme');
		    $(this).addClass('sighting-card-expanded');
		  
		    

		})
	    })
	}
	init_InfScroll();
	test_get_sightings('#cloner','#scroll-1');
	display_card();
    });
}()


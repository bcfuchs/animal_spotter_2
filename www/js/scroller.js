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
	    if (image !== undefined && image !== "") {
		$(el).find(".sighting-card-summary .photo-sum img").attr('src',"data:image/jpeg;base64," + image);
	    }
	    else
	    {
		$(el).find(".sighting-card-summary .photo-sum").hide();
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

	var format_observations_text = function(obs) {
	    var out = [];

	    for (var i =0; i < obs.length; i++) {
		out.push(obs[i].name + ": " + obs[i].value);			 
	    }
	    
	    return out.join("\n\n");

	}
	var format_msg = function(date,species,location,observations,id){
	    var out  = [];
	    out.push("species: " + species);
	    out.push("when: " + date);
	    out.push("where: " + location);
	    out.push("observations: \n\n" + format_observations_text(observations));
	    return out.join("\n\n");
	}
	
	    
	var build_card = function(el,species,date,observations,location,id,image,locobj) {



	    $(el).find(".time .content").html(date);
	    $(el).find(".location .content").html(location);
	    $(el).find(".observations .content").html(format_observations(observations));
	    $(el).find(".species .content").html(species);
	    $(el).attr('data-sighting-id',id);
	    $(el).find(".share-btn").click(function(){
		
		var msg = format_msg(date,species,location,observations,id);

		var subject = "Animal Spotter Sighting " + species +  " " + date
		var img = "data:image/jpeg;base64," + image
		var file = {date:date,species:species,time:date,observations:observations,id:id,location:locobj}
		var json  = "data:application/json;base64," + btoa(JSON.stringify(file));
		
		window.plugins.socialsharing.share(msg, subject, [img,json])
		    

	    });
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
		    var location = "lat: " + d.location.lat + " lon:" + d.location.lon;
		    var species = d.species;
		    var observations = d.observations;
		    var photo = d.photo;
		    var id = d.time;
		    
		    // summary card
		    build_card_summary(el,d.species,date,photo);

		    // card							   
		    build_card(el,species,date,observations,location,id,photo,d.location);

		    // add to top of list
		    $(listSel).prepend(el);

		    // add active if top item
		    if (i === max) {
			$(el).addClass("active");
		    }
		}
	    }
	    // load items -- check first that they arent in the trash.
	    var proc = function (d) {

		var handler = function(i,max) {
		    log("handler " + i + ' ' + max);
		    return function(d){
			// only load if not in trash
			var cb_loader = function(check){
			    if (check === false) {
				load_sighting(d,i,max)
			    }
			}
			storage_exists('trash',d.time,cb_loader);
		    }

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
	    $('.sighting-card-summary').click(function(){
		var el = $(this).parent();

		var expanded = $(el).data("expanded");

		    if (expanded === false) {

			// for if we want a separate page for editing...
			var id = $(el).data("data-sighting-id");

			// hide rest, show this one
			$('.sighting-card-container').not(el).addClass('hide-sighting-card');

			// remove the active indicator
			$(el).removeClass("active"); 
			console.log(el);

			// expand the div show the controls. 
			$(el).find(".hideme").removeClass('hideme');
			$(el).addClass('sighting-card-expanded');

			// move the share button  to top and show it
		//	$("#share-target").html($(el).find(".share-btn"));
		//	$("#share-target").find(".share-btn").removeClass("hidden");
			$(el).find(".share-btn").removeClass("hidden");
			

			// close the expanded card on click
			$(el).data("expanded",true);
		    }

		else {

	
		    $(el).removeClass('.sighting-card-expanded');
		    $(el).find(".sighting-card").addClass("hideme");
		    $('.sighting-card-container').removeClass("active");
		    $(el).addClass("active"); 
		    $(el).data("expanded",false);
		    $('.sighting-card-container').removeClass('hide-sighting-card');
		    }
		    

	
	    })

	}

	var close_card = function() {

	    $(".close-btn").click(function(){
		var el = $(this).parent().parent().parent().parent();
		
		$(el).removeClass('sighting-card-expanded');
		$(el).find(".sighting-card").addClass("hideme");
		$('.sighting-card-container').removeClass("active");
		$(el).addClass("active"); 
		$(el).data("expanded",false);
		$('.sighting-card-container').removeClass('hide-sighting-card');
		console.log(el);

	    })
	}
	var bin_card = function(){
	    var binme = function() {
		var el = $(this).parent().parent().parent().parent();
		var id = $(el).data("sighting-id");
		var sighting = {trash:true}
		sighting.key = id;
		storage_put('trash',sighting,function(d){console.log(d)});
		console.log(id);
	    }
	    
	    $(".bin-btn").click(binme);

	}
	init_InfScroll();
	test_get_sightings('#cloner','#scroll-1');
	display_card();
	close_card();
	bin_card();
    });
}()


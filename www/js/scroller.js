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
	var test_get_sightings  = function(cloneSel,listSel){
	    var log = function(m){console.log(m)}

	    var add_sighting = function(d){
		log("add sighting");
		log(d);
		if ("time" in d) {
		    log('got one');
		    var el = $(cloneSel).clone().removeAttr('id').removeClass('hideme');
		    
		    $(el).find(".time .content").html((new Date(d.time)).toString());
		    $(el).find(".location .content").html(d.location.lat + " " + d.location.lon);
		    $(el).find(".observations .content").html(d.observations);
		    $(el).find(".species .content").html(d.species);

		    $(listSel).prepend(el);
		}
	    }
	    
	    var proc = function (d) {
		for (var i = 0; i < d.length; i++) {
		    log("gettinga sighting...");
		    storage_get('sightings',d[i],add_sighting);

		}

	    }
	    storage_keys('sightings',proc);
	    
	}
	init_InfScroll();
	    test_get_sightings('#cloner','#scroll-1');
    });
}()


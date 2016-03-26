! function(){

    document.addEventListener("deviceready",anspot,false);
    var click_species,hover_species,save_species_select;
    function anspot() {

	console.log("animal spotter !");
	$(document).ready(function(){
	    click_species();
	    save_species_select();
	});
    }

    click_species = function(){
	console.log('setting up click species !');

	$(".species-select").click(function(){
	    console.log("clicked specsel");
	    $(".query-panel-img").addClass('bw')
	    var species = $(this).attr("data-species");
	    $(this).find(".query-panel-img").removeClass('bw')
	    storage_put('anspot',{key:'species',value:species},function(d){console.log(d)});
	    var time = Date.now();
	    storage_put('anspot',{key:'time',value:time},function(d){console.log(d)});

	});
    };
    
    var storage_keys = function(name,cb) {
	Lawnchair({name:name,adapter:'dom'},function(){
	    this.keys(cb);
	});
    };
    
    var storage_get = function(name,key,cb){
	console.log('lawn get name:' + name + ' key: ' + key);
	Lawnchair({name:name,adapter:'dom'},function(){
	    this.get(key, function(d) {
		cb(d);
	    });
	});

    }

    var storage_put = function(name,object,cb){
	console.log('lawn put  ' + name );
	Lawnchair({name:name,adapter:'dom'},function(){
	    this.save(object,cb);
	})
	
    }

    var add_to_scroller = function(scrollSel,cb) {
	
	$(scrollSel).on('scroll',function(ev) {
	    
	    if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
		cb.call(this)
		
	    }
	});
	
    }
    
    save_species_select = function() {

	var log = function(m){console.log(m)}
	log("save species select");
	$(document).ready(function(){
	    console.log($(".sight-link"));
	    $(".sight-link").on('click',function(e){
		
		var species_type = $(this).attr('data-animal-type');
		
		storage_put('anspot',{key:'species-type',value:species_type},log);
	    });
	});
	
    }
    
    var format_observations_html = function(obs,klass) {
	var out = $('<div></div>');
	    console.log(obs);
	    for (var i =0; i < obs.length; i++) {
		console.log(obs[i].name);
		var label = $("<span></span>").html(obs[i].name).addClass("label");
		var content = $("<span></span>").html(obs[i].value).addClass('content');
		var div = $("<div></div>").append(label).append(content);
                if (klass !== undefined) {
		    $(div).addClass(klass);
		}
		out.append(div);
	    }

	    return out

	}

    /** export */
    window.storage_get = storage_get;
    window.storage_put = storage_put;
    window.storage_keys = storage_keys;
    window.infScroller = add_to_scroller;
    window.format_observations_html = format_observations_html;
}()



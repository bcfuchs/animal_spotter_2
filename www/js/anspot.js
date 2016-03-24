! function(){

document.addEventListener("deviceready",anspot,false);
    var hover_species,save_species_select;
    function anspot() {

	console.log("animal spotter !");
	$(document).ready(function(){
	click_species();
	save_species_select();
	});
    }

    save_species_select = function() {
	var storeWrapper,speciesType;

	$(document).ready(function(){
	    console.log($(".sight-link"));
	    $(".sight-link").on('click',function(e){

		var species = $(this).attr('data-animal-type');
		storeWrapper('anspot',species);
	    });
	});
	
	var storeWrapper = function(name, speciesType) {
	    var store = new Lawnchair({name:name}, function(store) {
	    var key = "species-type";
	    // Create an object
	    var me = {key:key,value:speciesType}; // from scope

	    // Save it
	    store.save(me);

	    // Access it later... Yes even after a page refresh!
	    store.get(key, function(me) {
		console.log(me);
	    });
	});
	}


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
    }
    
    var storage_keys = function(name,cb) {
	Lawnchair({name:name},function(){
	    this.keys(cb);
	});
    };
    
    var storage_get = function(name,key,cb){
	console.log('lawn get name:' + name + ' key: ' + key);
	Lawnchair({name:name},function(){
	    this.get(key, function(d) {
		cb(d);
	    });
	});

    }

    var storage_put = function(name,object,cb){
	console.log('lawn put  ' + name );
	Lawnchair({name:name},function(){
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

	/** export */
    window.storage_get = storage_get;
    window.storage_put = storage_put;
    window.storage_keys = storage_keys;
    window.infScroller = add_to_scroller;
    
}()

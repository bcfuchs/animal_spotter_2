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
	    $(this).find(".query-panel-img").removeClass('bw')
	    

	});
    }

    var storage_get = function(name,key,cb){
	console.log('lawn get ' + name + ' ' + key);
	Lawnchair({name:name},function(){
	    this.get('species-type', function(d) {
		cb(d);
	    })
	})

    }

    window.storage_get = storage_get

    
}()

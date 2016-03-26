! function() {
    $(document).on('deviceready',function(){  
    var show_species_type = function (d) {
	

	$(".species-select").hide();
	$("."+d.value).show();

    }
    click_species = function(){
	console.log('setting up click species !');
	var species_type;
	var log = function(m){console.log(m)}

	storage_get('anspot','species-type',show_species_type);
	
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
	click_species();
    
      });

}();

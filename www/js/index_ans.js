! function() {
    $(document).on('deviceready',function(){
	var save_species_select = function() {
	    var log = function(m){ console.log(m)};
	    
	    $(".sight-link").on('click',function(e){		
		var species_type = $(this).attr('data-animal-type');		
		storage_put('anspot',{key:'species-type',value:species_type},log);

	    });
	    
	    
	}
	
	save_species_select();
    });

}()

! function() {
    $(document).on('deviceready',function(){  

	/** definitions */
	
	var _show_species_type = function (d) {
	    
	    var klass = "." + d.value;
	    $(".species-select").hide();
	    $(klass).show();
	    
	}
	/** called inside _species_loader */
	var _click_species = function(_complete_actions){

	    console.log('setting up click species !');
	    var species_type;
	    var log = function(m){console.log(m)}

	    console.log($(".species-select"));
	    
	    $(".species-select").click(function(){
		console.log("clicked specsel");
		$(".image img").addClass('bw')
		var species = $(this).data("species");
		$(this).find(".image img").removeClass('bw')
		storage_put('anspot',{key:'species',value:species},function(d){console.log(d)});
		var time = Date.now();
		storage_put('anspot',{key:'time',value:time},function(d){console.log(d)});
		$("#msg").html(species);

		_complete_actions();
	    });
	}

	var _click_species_complete_actions = function() {

	    $(".footer-container").removeClass("hideme").show();
	    $(".species-select-container").removeClass("h79").addClass("h65");


	}

				       
	var _species_loader = function(csv,templateSel,targetSel) {

	    var sp = $.csv.toObjects(csv);

	    for (var i = 0; i < sp.length; i++) {
		var t = $(templateSel).clone().removeAttr('id').addClass(sp[i]['alert_type']); // hack !

		var names = Object.keys(sp[i]);

		for (var j = 0 ; j < names.length;j++) {
		    var name = names[j];
		    var content = sp[i][name];
		    switch(name) {

		    case "image":
			$(t).find("."+name + " img").attr("src",content);
			break;
		    case "link":
			$(t).find("."+name + " a").attr("href",content);
			break;
		    case "name":
			$(t).attr("data-species",content);
			$(t).find("."+name).html(content);
			break;
		    default:
			$(t).find("."+name).html(content);
		    }

		}

		$(targetSel).append(t);
	    }
	    _click_species(_click_species_complete_actions);
	    storage_get('anspot','species-type',_show_species_type); // finally show the species

	}
	var load_species = function(url,templateSel,targetSel){
	    console.log("load species");
	    
	    // only load if the file is not present in localstorage.
	    
	    
	    var success = function(d){
		(function(d) { _species_loader(d,templateSel,targetSel) })(d,templateSel,targetSel);
	    }
	    var error = function(d) {
		console.log("error! " + d);
	    }
	    var always = function() { console.log("done loading species")};
	    $.ajax(url).done(success).fail(error).always(always);


	}
	var make_title = function(d){
	    var out = "";
		switch(d.value) {
		case "sea":
		    out = "Beach";
		    break;
		case "air":
		    out = "Bird"
		    break;
		case "land":
		    out = "Land"
		    break;
		}

	    $("#title-type .place ").html(out);    
	}
	var set_title = function() {
	    storage_get('anspot','species-type',function(d){ make_title(d) });
	}
	
	/** invoke */
	var csv,cloneSel,targetSel;

	csv = "data/species.csv";
	cloneSel = "#species-template"
	targetSel = "#species-select-scroller";

	set_title();
	load_species(csv,cloneSel,targetSel);


    });

}();

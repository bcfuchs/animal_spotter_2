! function() {

    var setup_form_save = function(saveButtonSel,formSel) {	
	var log = function(m){console.log(m)}
	$(saveButtonSel).click(function(e){
	    // don't submit
	    e.preventDefault();
	    var serjson = $(formSel ).serializeArray();
	    $(this).removeClass("btn-primary").addClass("btn-success").prop('disabled', true);;
	    $(this).html("Saved!");
	    storage_put('anspot',{key:'observations',value:serjson},log);
	    var e = $.Event('observationSaved');
	    $(window).trigger(e);
	});

    }

    $(document).on('deviceready',function(){
	footer_show_on_click();
	var saveButtonSel = "#save";
	var formSelector = "#observation-form";
	
	setup_form_save(saveButtonSel,formSelector);	
	
    });

    //storage_get('species-select','species-type',function(d){ make_title(d) });


}()

! function() {

    var setup_form_save = function(saveButtonSel,formSel) {	
	var log = function(m){console.log(m)}
	$(saveButtonSel).click(function(e){
	    // don't submit
	    e.preventDefault();
	    var serjson = $(formSel ).serializeArray();
	    $(this).removeClass("btn-primary").addClass("btn-success").prop('disabled', true);
	    $(this).html("Saved!");
	    storage_put('anspot',{key:'observations',value:serjson},log);
	    var ee = $.Event('observationSaved');
	    $(window).trigger(ee);
	});

    }


    var conditional_show_form_field = function(formSel) {
	$(formSel).each(function(){

	    $(this).find("[data-show-if-checked]").each(function(){
		$(this).on('change',function(){
		    
		    var next = $(this).data('show-if-checked');
		    if($(this).is(':checked')) {
			$(next).removeClass('hideme');
		    }
		    else {
			console.log(this);
		    }

		}) // on change

	    }) // find


	    $(this).find("[data-hide-if-checked]").each(function(){
		$(this).on('change',function(){
		    
		    var next = $(this).data('hide-if-checked');
		    if($(this).is(':checked')) {
			$(next).addClass('hideme');
		    }
		    else {
			console.log(this);
		    }

		}) // on change

	    }) // find



	}) // formSel

	

    }
    $(document).on('deviceready',function(){

	footer_show_on_click();

	var saveButtonSel = "#save";
	var formSelector = "#observation-form";
	
	setup_form_save(saveButtonSel,formSelector);	
	conditional_show_form_field("#observation-form");
    });

    //storage_get('species-select','species-type',function(d){ make_title(d) });


}()

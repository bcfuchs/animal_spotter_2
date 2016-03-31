! function() {
    var log = function(m) { console.log(m)}
    var save = function(m){
	if($(this).is(':checked')) {
	    
	}
	console.log("saving");
	var value;
	var name  = $(this).attr('id');
	value  = $(this).is(':checked');
	storage_put('options',{key:name,value:value},log);
	console.log(name + " " + value)
    }
    var set_option  = function(keys) {


	var do_set_function = function(key) {
	    var h = function(d) {
		var sel = "#"+key;
		var val = d.value;
		if ($(sel).is(':checked') && val === false) {
		    $(sel).click();
		}
		if (!($(sel).is(':checked')) && val === true) {
		    $(sel).click();
		}

	    }
	    storage_get('options',key,h);
	}

	for (var i = 0; i < keys.length; i++) {
	    do_set_function(keys[i]);
	}
    }

    var set_options = function(m) {
	storage_keys('options',set_option);

    }
    var set_toggles = function(){

	// set up toggles
	$("[name='notify']").bootstrapSwitch();
	$("input[type=\"checkbox\"]").bootstrapSwitch({'onText':'Yes',offText:'No',onSwitchChange:save});
	
    }
    
    var set_watch = function() {
	$(".watch-ans").on('click',function(){
	    console.log(this);
	});

    }
    
    $(document).on('deviceready',function(){
	
	set_toggles();
	set_options();
	
	
    })
}()

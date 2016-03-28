! function(){

    document.addEventListener("deviceready",anspot,false);
    var click_species,hover_species,save_species_select;

    function anspot() {

	console.log("animal spotter !");
	$(document).ready(function(){


	});
    }
    // show the footer when $el is clicked
    var footer_show_on_click = function() {
	var event = "click";
	console.log('footer_show_on_click');
	var showSel = ".show-on-click";
	$(showSel).each(function(){
	    var event  = $(this).data('open-event');
	    var eventTargetSel = $(this).data('open-event-target');
	    var el = $(this);
	    var classAdd = $(this).data('open-event-add-class');
	    var classRemove = $(this).data('open-event-remove-class');
	    $(window).on( event, function(){
		console.log("hi there");
		$(el).removeClass("hideme").show();
		$(eventTargetSel).removeClass(classRemove).addClass(classAdd);
	    });
	})
	
    }
	
    
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
    var storage_exists = function(name,key,cb) {
	Lawnchair({name:name,adapter:'dom'},function(){
	    this.exists(key,cb);
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
    window.storage_exists = storage_exists;
    window.infScroller = add_to_scroller;
    window.footer_show_on_click = footer_show_on_click;
    window.format_observations_html = format_observations_html;
}()



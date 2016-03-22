(function(window){
    $(document).ready(function(){

	    if (location.href.match(/#id-(.*)$/)) {
		var id = location.href.match(/#id-(.*)$/);
		$("#id-for-image").html(id[1]);


	    }


	});


})(window);
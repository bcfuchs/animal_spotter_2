! function() {
    $(document).on('deviceready',function(){
	var cnt = 0;
	var add_els = function(top,sel,n) {
	    var els = []
	    for (var i = 0; i < n;i++) {

		$(top).append($(sel).clone().html("new div " + i + " " + cnt));
		
	    }
	    cnt = cnt +1;
	}
	infScroller("#scroll-1",function(){add_els('#scroll-1','#cloner',10)});   
    });
}()

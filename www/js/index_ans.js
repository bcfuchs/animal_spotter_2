! function() {
    document.addEventListener("deviceready", function() {
//    $(document).on('deviceready',function(){
	var save_species_select = function() {
	    var log = function(m){ console.log(m)};
	    
	    $(".sight-link").on('click',function(e){		
		var species_type = $(this).attr('data-animal-type');		
		storage_put('anspot',{key:'species-type',value:species_type},log);

	    });
	    
	    
	}
	var test_db = function(){

	    function onInitFs(fs) {
		console.log('Opened file system: ' + fs.name);
	    }
	    errorHandler = function(e) {
		console.log(e);

	    }
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 50*1024*1024 /*50MB*/, onInitFs, errorHandler);
	}

	    var success = function(fs) {
		console.log('Opened file system: ' + fs.name);
		
	    }
	    var error = function(e) {
		console.log(e);

	    }

//	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, success, error);
	var test_write = function() {
	    function writeToFile(fileName, data,type) {
		data = JSON.stringify(data, null, '\t');
		
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
		    directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
			fileEntry.createWriter(function (fileWriter) {
			    fileWriter.onwriteend = function (e) {
				
				// for real-world usage, you might consider passing a success callback
				console.log('Write of file "' + fileName + '"" completed.');
			    };

			    fileWriter.onerror = function (e) {
				// you could hook this up with our global error handler, or pass in an error callback
				console.log('Write failed: ' + e.toString());
			    };
			    // NOTE -- image here. 
			    var blob = new Blob([data], { type: type });
			    fileWriter.write(blob);
			}, errorHandler.bind(null, fileName));
		    }, errorHandler.bind(null, fileName));
		}, errorHandler.bind(null, fileName));
	    }

	    writeToFile('example.json', { foo: 'bar' });

	}



	save_species_select();
	test_db();
	test_write();
    },false);

}()

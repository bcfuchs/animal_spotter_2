! function() {
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    document.addEventListener("deviceready",onDeviceReady,false);


    function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
	// Uncomment to view the base64-encoded image data
	// console.log(imageData);

	// Get image handle
	//

	var div = document.createElement("div");
	var a = document.createElement("a");
	var id =  "id-"+(new Date()).getTime();
	a.href = "form.html#"+id;
	div.className = "gallery-image-container";
	var smallImage = document.createElement("img");
	//    document.getElementById('smallImage');

	
	smallImage.className = "smallImage";
	// Show the captured photo
	// The in-line CSS rules are used to resize the image
	//
	smallImage.src = "data:image/jpeg;base64," + imageData;
	saveData(imageData,id,function(r) {console.log("got an image!")});
	var gall =     document.getElementById('image-gallery');
	a.appendChild(smallImage);
	div.appendChild(a);
	gall.appendChild(div);
	
    }

    function saveData(d,id,cb) {
	// TODO store in a separate collection -- there might be more than one
	storage_put('anspot',{key:'photo',value:d},cb);

    }
    
    function saveDataURI(uri,cb) {

	// TODO store in a separate collection -- there might be more than one
	storage_put('anspot',{key:'photo',value:uri},cb);
	    
    }
    
    
    function onPhotoURISuccess(imageURI) {

	console.log(imageURI);
	saveDataURI(uri,function(m){ console.log("saving image data " + m);
	$('#image-gallery').append($('<img></img>').attr('src',imageURI)).addClass("thumbnail");;
	$('#cam-icon').style({'width','100px'});

    }

    // A button will call this function
    //
    function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
								  destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
								  destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhotoURI(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
								 destinationType: destinationType.FILE_URI,
								 sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
	console.log('Failed because: ' + message);
    }


}();

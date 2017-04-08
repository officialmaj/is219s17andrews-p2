// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
var mCurrentIndex = 0;

function swapPhoto() {

	 if(mCurrentIndex < 0){
		mCurrentIndex += mImages.length;
	}
	
	$("#photo").attr('src', mImages[mCurrentIndex].imgPath);
	$(".location").text("Location: "+mImages[mCurrentIndex].imgLocation);
	$(".description").text("Description: "+mImages[mCurrentIndex].description);
	$(".date").text("Date: "+mImages[mCurrentIndex].date);

	
	mCurrentIndex++;
	if(mCurrentIndex >=  mImages.length){
		mCurrentIndex = 0;
	}
	
}

function getQueryParams(qs) {
	qs = qs.split("+").join(" ");
	var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}
	return params;
}


// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'insert_url_here_to_image_json';

mRequest.onreadystatechange = function() { 
	
	if (mRequest.readyState == 4 && mRequest.status == 200) {
	try { 
		mJson = JSON.parse(mRequest.responseText);
		console.log(mJson);
			
	for(var i=0; i < mJson.images.length;i++)
		{
            var myline = mJson.images[i];
			mImages.push(new GalleryImage(myline.imgLocation,myline.description,myline.date,myline.imgPath));
		}
		console.log(mImages);
		} catch(err) { 
			console.log(err.message);
		} 
	} 
}; 


mRequest.open("GET", mUrl, true);
mRequest.send();
//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() { ///////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////// /////////////////////////////////////////////////////////////////////////////

	$('.details').eq(0).hide();
	
	$('.moreIndicator').click(function(){
		
		$('.details').eq(0).show(); 
		
		$(this).removeClass('rot90');
		$(this).addClass('rot270');
	
	});
	
	  $('#nextPhoto').click(function () {
		console.log("nextPhoto was clicked!")
		swapPhoto();
		mLastFrameTime = 0;
	
	
})
	
 ///////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////// /////////////////////////////////////////////////////////////////////////////	

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(imgLocation, description, date, imgPath) {
	
	this.imgLocation = imgLocation;
	this.description = description;
	this.date = date;
	this.imgPath = imgPath;	
}


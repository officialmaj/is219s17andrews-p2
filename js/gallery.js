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

function swapPhoto() {

  if(mCurrentIndex == 0 || mCurrentIndex < mImages.length){
      $('.thumbnail').attr("src", mImages[mCurrentIndex].img);
      $('.location').text("Location: " + mImages[mCurrentIndex].location);
      $('.description').text("Description: " + mImages[mCurrentIndex].description);
      $('.date').text("Date: " + mImages[mCurrentIndex].date);
      mCurrentIndex++;
  } else if (mCurrentIndex >= mImages.length){
    mCurrentIndex = 0;
    $('.thumbnail').attr("src", mImages[mCurrentIndex].img);
    $('.location').text("Location: " + mImages[mCurrentIndex].location);
    $('.description').text("Description: " + mImages[mCurrentIndex].description);
    $('.date').text("Date: " + mImages[mCurrentIndex].date);
    mCurrentIndex++;
  } else {
    mCurrentIndex = mImages.length + mCurrentIndex;
    $('.thumbnail').attr("src", mImages[mCurrentIndex].img);
    $('.location').text("Location: " + mImages[mCurrentIndex].location);
    $('.description').text("Description: " + mImages[mCurrentIndex].description);
    $('.date').text("Date: " + mImages[mCurrentIndex].date);
    mCurrentIndex++;
  }
	console.log('swap photo');
}

function getQueryParams(qs) {
	qs = qs.split("+").join(" ");
	var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}
	return params;
}

var $_GET = getQueryParams(document.location.search);

if($_GET['json'] == null || $_GET['json'] == ''){
  $_GET['json'] = 'images.json';
}

var mCurrentIndex = 0;
// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

var mJson;

// Holds the retrived JSON information
var mUrl = $_GET['json'];
// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
/*
if($_GET["json"] == undefined){
	
	mUrl = "extra.json";
}	else {
	
	mUrl = $_GET["json"];
	
}
*/
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
		console.log(mJson);
		console.log(mJson.images[0].date);
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
		
		$('.details').eq(0).toggle(); 
		
		$(this).removeClass('rot90');
		$(this).addClass('rot270');
	
	});
	
	  $('#nextPhoto').click(function () {
		console.log("nextPhoto was clicked!")
		swapPhoto();
		mLastFrameTime = 0;
	
});

		$('#prevPhoto').click(function(){
			
			console.log("prevPhoto was clicked");
			mCurrentIndex -= 1;
			swapPhoto();
			mLastFrameTime = 0;
			
		});
});
	
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
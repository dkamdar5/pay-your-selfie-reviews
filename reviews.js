$(document).ready(function() {
    $.get( "https://itunes.apple.com/rss/customerreviews/id=938806572/json", function(data){
	console.log(data);
    }, "json");  // specify format
});
$(document).ready(function() {

    // get average user review
    $.get("https://itunes.apple.com/lookup?id=938806572", function(data){
	var avgRating = data.results[0].averageUserRating;
	$("#ios-avg-rating").html(avgRating);
    }, "jsonp");  // using jsonp to solve CORS issue

    // get individual user reviews
    $.get("https://itunes.apple.com/rss/customerreviews/id=938806572/json", function(data){
	// ignore first, stop at 2 because we only need to retrieve the latest review.
	for (i=1; i < 2; i++) {
	    // create variables for the values retrieved
	    var entry = data.feed.entry[i];
	    var author = entry.author.name.label;
	    var review = entry.content.label;
	    var rating = entry["im:rating"].label;
	    var title = entry.title.label;

	    // assign values
	    $("#ios-author").html(author);
	    $("#ios-rating").html(rating);
	    $("#ios-review-full").html(review);
	    $("#ios-review-title").html(title);
	}
    }, "json");  // specify format
});
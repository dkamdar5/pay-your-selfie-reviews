$(document).ready(function() {
    $.get("https://itunes.apple.com/rss/customerreviews/id=938806572/json", function(data){
	// ignore first
	for (i=1; i < data.feed.entry.length; i++) {
	    // create variables for the values retrieved
	    var entry = data.feed.entry[i];
	    var author = entry.author.name.label;
	    var review = entry.content.label;
	    var rating = entry["im:rating"].label;
	    var title = entry.title.label;

	    $review = $("div.review").first().clone();  // clone

	    // assign values
	    $review.find(".author").html(author);
	    $review.find(".review").html(review);
	    $review.find(".rating").html(rating);
	    $review.find(".title").html(title);

	    $review.appendTo("#results");  // add to results
	}
	$("div.review").first().css("display", "none");  // hide template div
    }, "json");  // specify format
});
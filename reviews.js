$(document).ready(function() {

    // get average iOS user rating
    $.get("https://itunes.apple.com/lookup?id=938806572", function(data){
	var avgRating = data.results[0].averageUserRating;
	$("#ios-avg-rating").html(avgRating);
    }, "jsonp");  // using jsonp to solve CORS issue

    // get individual iOS user reviews
    $.get("https://itunes.apple.com/rss/customerreviews/id=938806572/json", function(data){
	// ignore first, 2nd element is the latest review.
	var entry = data.feed.entry[1];
	
	// create variables for the values retrieved
	var author = entry.author.name.label;
	var review = entry.content.label;
	var rating = entry["im:rating"].label;
	var title = entry.title.label;

	// assign values
	$("#ios-author").html(author);
	$("#ios-rating").html(rating);
	$("#ios-review-full").html(review);
	$("#ios-review-title").html(title);
    }, "json");  // specify format

    // get Android user review
    var url = "https://play.google.com/store/apps/details?id=com.payyourselfiellc.payyourselfie"
    $.get("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22"+encodeURIComponent(url)+"%22&format=json'&callback=?",
	function(data){
		$html_str = $(data.results[0]);  // parse data
		var avgRating = $html_str.find('div.score').first().html();
		// find latest review
		$review = $html_str.find('div.featured-review').first();
		// create variables for the values retrieved
		author = $review.find('span.author-name').first().find('a').html();
		title = $review.find('span.review-title');
		rating = $review.find('div.tiny-star').attr("aria-label");
		review = $review.find('div.review-text');

		// assign values
		$("#android-avg-rating").html(avgRating);
		$("#android-author").html(author);
		$("#android-rating").html(rating);
		$("#android-review-full").html(review);
		$("#android-review-title").html(title);
    }, "jsonp");  // using jsonp to solve CORS issue
});
$(document).scroll(function() {
	if ($(this).scrollTop() > $(window).height() / 2) {
		$("#navbar").removeClass("black");
	}
	else {
		$("#navbar").addClass("black");
	}
});
$(document).scroll(function() {
	if ($(this).scrollTop() > $(window).height() / 2) {
		$("#name").addClass("shown");
        $("#photo-wrapper").addClass("shown");
	}
	else {
		$("#name").removeClass("shown");
        $("#photo-wrapper").removeClass("shown");
	}
	if ($(this).scrollTop() > $(window).height() / 3) {
        // Show the header and sentences
        if (!$(".sentence").hasClass("shown")) {
            let numSentences = $(".sentence").length;
            for (let i = 0; i < numSentences; i++) {
                setTimeout(function() {
                    $(".sentence:nth(" + i + ")").addClass("shown");
                }, i * 300);
            }
        }
	}
	if ($(this).scrollTop() > $(window).height() * 1.5) {
        // Show all the sentences if you scroll super fast
		$(".sentence").addClass("shown");
	}
});


var things = [
    "programming a better brain",
];
var NUM_THINGS = things.length;

var TYPE_SPEED = 70,
    WORD_DELAY = 3000,
    EMPTY_DELAY = 600,
    BLINK_SPEED = 700;

$(document).ready(function(){
    function cursor_blink() {
        $("#cursor").toggleClass("shown");
        setTimeout(cursor_blink, BLINK_SPEED);
    }
    cursor_blink();

    var thing_index = 0;
    var char_idx = 0;
    var is_typing = true;
    var str = " " + things[(thing_index++ % NUM_THINGS)];
    function type() {
        let is_html_tag = false;
        do {
          let character = str[char_idx];
          if (is_typing ? character === "<" : character === ">") {
            is_html_tag = true;
          }
          if (is_typing ? character === ">" : character === "<") {
            is_html_tag = false;
          }
          char_idx += is_typing ? 1 : -1;
        } while (is_html_tag && char_idx < str.length);
        let text = str.slice(0, char_idx);
        $("#thing").html(text);
        if (text === str) {  // finished this word; stay for a bit then delete
            is_typing = false;
            return setTimeout(type, WORD_DELAY);
        }
        else if (text === "") {  // finished deleting; next word
            is_typing = true;
            str = " " + things[(thing_index++ % NUM_THINGS)];
            return setTimeout(type, EMPTY_DELAY);
        }
        setTimeout(type, TYPE_SPEED);
    }
    setTimeout(type, EMPTY_DELAY);
});
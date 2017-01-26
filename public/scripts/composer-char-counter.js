// allows the character counter font to change to red after passing 140 characters
$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    let text = $(this).val();
    let textCount = text.length;
    let remainingCount = 140 - textCount;
    let counter = $(this).parent().find($(".counter"));
    if (remainingCount < 0) {
      counter.addClass('over140');
    } else {
      counter.removeClass('over140');
    }
    counter.text(remainingCount);
  });
});
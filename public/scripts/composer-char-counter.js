$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    let text = $(this).val();
    let textCount = text.length;
    let remainingCount = 140 - textCount;
    let counter = $(this).parent().find($(".counter"));
    if (remainingCount < 0) {
      counter.addClass('tooManyChars');
    } else {
      counter.removeClass('tooManyChars');
    }
    counter.text(remainingCount);
  });
});
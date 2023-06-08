$(document).ready(function () {
  $(".table").on("scroll", function () {
    $("#table__row--header").toggleClass("sticky", this.scrollTop > 0);
  });
});

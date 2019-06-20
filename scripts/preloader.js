
$(window).on("load",function() {
    $("#preloader").addClass("start");
    $("#preloader.start").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
        $("#preloader").addClass("complete");
        $("#contents").removeClass("hidden");
        $("#contents").fadeIn("fast", "swing")
    });
});
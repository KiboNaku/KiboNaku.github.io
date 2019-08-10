
function size_main(){

    var main_width = document.getElementById("jump_sidebar").parentElement.offsetWidth -
                    document.getElementById("jump_sidebar").offsetWidth;
    document.getElementById("main_body").style.width = main_width + "px"; 

    function getScrollBarWidth () {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";
      
        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild (inner);
      
        document.body.appendChild (outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;
      
        document.body.removeChild (outer);
      
        return (w1 - w2);
      };
}

window.onresize = function(event) {
    size_main();
};

$(window).on("load",function() {

    // $(window).scroll(function() {

    //     var windowMiddle = $(window).scrollTop() + Math.floor(window.innerHeight/2);

    //     $(".fadeable, .project").each(function() {

    //     var objectHalf = $(this).outerHeight()/2;

    //     var objectMiddle = $(this).offset().top + objectHalf;
    //     var objectTop = objectMiddle - objectHalf/2;
    //     var objectBottom = objectMiddle + objectHalf * (this.id == "intro"? .2 : 1.3);

    //     var deduction = 0;

    //     if(windowMiddle < objectTop){
    //         deduction = (objectTop - windowMiddle)/(objectHalf/1.5);
    //     }else if(windowMiddle > objectBottom){
    //         deduction = (windowMiddle - objectBottom)/(objectHalf/1.5);
    //     }

    //     var opacity = 1 - deduction;

    //     if(opacity < 0) opacity = 0;
    //     else if(opacity > 1) opacity = 1;

    //     $(this).css("opacity", opacity);
    // });

    // $("#intro, #about_me").each(function(){
    //     var jumpOpacity = 0;
    //     var introBottom = $("#intro").offset().top + $("#intro").outerHeight();

    //     if(windowMiddle > introBottom){
    //         var offset =  ($("#about_me").offset().top - introBottom);
    //         jumpOpacity = (windowMiddle - introBottom)/offset;
    //         $("#jump_sidebar").css("pointer-events", "all");
    //     }else {
    //         $("#jump_sidebar").css("pointer-events", "none");
    //     }

    //     if(jumpOpacity > 1) jumpOpacity = 1;

    //     $("#jump_sidebar").css("opacity", jumpOpacity);
    // });
    // }).scroll();
  });

$(".contact_email").on('click', function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    window.location.href = "mailto:andy.ni@utexas.edu";
});

size_main();
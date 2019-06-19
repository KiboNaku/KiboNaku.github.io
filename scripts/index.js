
function size_main(){
    var main_width = document.getElementById("jump_sidebar").parentElement.offsetWidth -
                    document.getElementById("jump_sidebar").offsetWidth;
    document.getElementById("main_body").style.width = main_width + "px"; 
}

size_main();

window.onresize = function(event) {
    size_main();
};
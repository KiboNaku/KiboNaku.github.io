
$(window).on("load",function() {
    $("#preloader").addClass("start");
    $("#preloader.start").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
        $("#preloader").addClass("complete");
        $("#loader").addClass("complete");
        $("#contents").removeClass("hidden");
        $("#contents").fadeIn("fast", "swing")
    });
});

var c = document.getElementById("preloadCanvas"),
    ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

console.log(c.width, c.height)

var dots = [],
    minSize = 1,
    maxSize = 4,
    minSpeed = .3,
    maxSpeed = 2,
    minAlpha = .6,
    maxAlpha = 1
    colors = ["255, 255, 255", "122, 255, 117", "128, 255, 223", "255, 141, 128", "157, 50, 250"]
    numDots = Math.floor(c.width*c.height/17000),
    xmax = c.width,
    ymax = c.height,
    bufferDistance = 50;

var init = () => {
    for(let i=0; i<numDots; i++){
        dots[i] = {
            size: rand(minSize, maxSize),
            saveSize: null,
            xpos: rand(0, xmax),
            ypos: rand(0, ymax),
            xspeed: randomDirection() * rand(minSpeed, maxSpeed, false),
            yspeed: randomDirection() * rand(minSpeed, maxSpeed, false),
            color: colors[rand(0, rand.length)],
            alpha: rand(minAlpha, maxAlpha, false),
            draw: function() {
                ctx.beginPath();
                ctx.arc(this.xpos, this.ypos, this.size, 0, 2 * Math.PI, false);
                ctx.fillStyle = "rgba(" + this.color + "," + this.alpha + ")"
                ctx.fill();
            },
            move: function() {
                this.xpos += this.xspeed;
                this.ypos += this.yspeed;
                if(this.xpos < -1 * bufferDistance){
                    this.xpos = -1 * bufferDistance
                    this.xspeed *= -1;
                }else if(this.xpos > xmax + bufferDistance) {
                    this.xpos = xmax + bufferDistance
                    this.xspeed *= -1;
                }
                if(this.ypos < -1 * bufferDistance){
                    this.ypos = -1 * bufferDistance
                    this.yspeed *= -1;
                }else if(this.ypos > ymax + bufferDistance) {
                    this.ypos = ymax + bufferDistance
                    this.yspeed *= -1;
                }
            },
            // finish: function(){
            //     if(this.size <= this.saveSize*2){
            //         this.size += .1;
            //         this.draw();        
            //     }
            // }

        }

        dots[i].saveSize = dots[i].size;
    }
}

init();

function rand (min, max, whole=true) {
    if(whole) max++;
    let num = Math.random()*(max-min) + min;
    if(whole) return Math.floor(num);
    return num; 
};

function randomDirection () {
    var forward = Math.floor(Math.random()*2) == 0;
    if(forward) return 1;
    return -1;
}

var intervalId = null;
function preload() {
    intervalId = setInterval( () => {
        ctx.clearRect(0, 0, c.width, c.height);
        dots.forEach((dot) => {
            dot.draw();
            dot.move();
        });
    }, 50);

}

preload();

function finish_preload(){
    if(intervalId != null) clearInterval(intervalId);
    var interval = 0;
    dots.forEach(() => {
        setTimeout(() => {
            ctx.clearRect(0, 0, c.width, c.height);
            dots.forEach((dot) => {dot.draw()})
            dots.shift()
            console.log(dots.length);
        }, interval)
        interval += 2000/dots.length;
    });
}

$(window).on('resize', function(){
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    xmax = c.width;
    ymax = c.height;
});

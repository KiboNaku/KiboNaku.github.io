
// initialize canvas-related variables
var canvas = document.getElementById("preloadCanvas"),
    ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// initialize preloader-related variables
var dots = [],      // will contain all of the dots on the screen
    // dot attribute-related variables
    minSize = 1,
    maxSize = 4,
    minSpeed = .3,
    maxSpeed = 2,
    minAlpha = .6,
    maxAlpha = 1
    colors = ["255, 255, 255", "122, 255, 117", "128, 255, 223", "255, 141, 128", "157, 50, 250"]
    numDots = 30 + 2/3*Math.floor(canvas.width*canvas.height/17000),    // number of dots moving on the screen
    bufferDistance = 50, // the number of pixels from the edges from the screen from which the dots "bounce"
    // preloader-specific
    showName = false;   // preloader condition: show name

var intervalId = null;

// populates the "dots" array
let generateDots = () => {
    for(let i=0; i<numDots; i++){
        let tempRadius = rand(minSize, maxSize);    // lets us use the random value twice
        dots[i] = {
            radius: {current: tempRadius, original: tempRadius},
            xpos: rand(0, canvas.width),    // starting x position
            ypos: rand(0, canvas.height),    // starting y position
            xvelocity: randomDirection() * rand(minSpeed, maxSpeed, false), // x velocity
            yvelocity: randomDirection() * rand(minSpeed, maxSpeed, false), // y velocity
            color: colors[rand(0, rand.length)], 
            alpha: rand(minAlpha, maxAlpha, false),

            // draw the dot on the screen
            draw: function() {
                ctx.beginPath();
                ctx.arc(this.xpos, this.ypos, this.radius.current, 0, 2 * Math.PI, false);
                ctx.fillStyle = "rgba(" + this.color + "," + this.alpha + ")"
                ctx.fill();
            },

            // change xpos and ypos according to the xspeed and yspeed respectively ("bounce" reach buffer)
            move: function() {
                this.xpos += this.xvelocity;
                this.ypos += this.yvelocity;

                if(this.xpos < -1 * bufferDistance){
                    this.xpos = -1 * bufferDistance
                    this.xvelocity *= -1;
                }else if(this.xpos > canvas.width + bufferDistance) {
                    this.xpos = canvas.width + bufferDistance
                    this.xvelocity *= -1;
                }

                if(this.ypos < -1 * bufferDistance){
                    this.ypos = -1 * bufferDistance
                    this.yvelocity *= -1;
                }else if(this.ypos > canvas.height + bufferDistance) {
                    this.ypos = canvas.height + bufferDistance
                    this.yvelocity *= -1;
                }
            },
        }
    }

    // generates a random number between the min and max (inclusive for integers and exclusive for floating point)
    function rand (min, max, whole=true) {
        if(whole) max++;
        let num = Math.random()*(max-min) + min;
        if(whole) return Math.floor(num);
        return num; 
    };

    // randomly returns 1 or -1
    function randomDirection () {
        let forward = Math.floor(Math.random()*2) == 0;
        if(forward) return 1;
        return -1;
    }
}

generateDots();


function preload() {
    intervalId = setInterval( () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach((dot) => {dot.draw()})
            dots.shift()
            console.log(dots.length);
        }, interval)
        interval += 2000/dots.length;
    });
}


$(window).on("load",function() {
    $("#preloader").addClass("start");
    $("#preloader.start").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
        $("#preloader").addClass("complete");
        $("#loader").addClass("complete");
        $("#nameDisplay").addClass("show");
        $("#nameDisplay").removeClass("hidden");
        $("#contents").removeClass("hidden");
        $("#contents").fadeIn("fast", "swing")
    });
});

$(window).on('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
//Create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1500;
canvas.height = 700;
canvas.style = "padding-left:0; padding-right: 0; margin-left: auto; margin-right: auto; display: block;";
document.body.appendChild(canvas);

var soundEaten = "/static/gamefiles/sounds/punch.wav";
var soundBubbles = "/static/gamefiles/sounds/bubbles.wav";
var soundwin = "/static/gamefiles/sounds/won.wav";
var soundEfx = document.getElementById("soundEfx");

//Shark sprite variables
var rows = 4;
var cols = 3;
var trackDown = 0;
var trackLeft = 1;
var trackRight = 2;
var trackUp = 3;

var spriteWidth = 550;
var spriteHeight = 708;
var width = spriteWidth / cols;
var height = spriteHeight / rows;

var curXFrame = 0; // start on left side
var frameCount = 3; // 3 frames per row
var srcX = 0; //x and y coordinates of sprite we want
var srcY = 0;
var left = false;
var right = true;
var up = false;
var down = false;

//Fish sprite variables
var fishrows = 2;
var fishcols = 3;
var fishtrackLeft = 0;
var fishtrackRight = 1;

var fishspriteWidth = 269;
var fishspriteHeight = 155;
var fishwidth = fishspriteWidth / fishcols;
var fishheight = fishspriteHeight / fishrows;

var fishcurXFrame = 0; // start on left side
var fishframeCount = 3; // 3 frames per row
var fishsrcX = 0; // x and y coordinates of sprite we want
var fishsrcY = 0;
var fishleft = true;
var fishright = false;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "/static/gamefiles/images/waterbackground.jpg";

// Shark image
var sharkReady = false;
var sharkImage = new Image();
sharkImage.onload = function () {
    sharkReady = true;
};
sharkImage.src = "/static/gamefiles/images/sharkspritesheet2.png";

// Fish image
var fishReady = false;
var fishImage = new Image();
fishImage.onload = function () {
    fishReady = true;
};
fishImage.src = "/static/gamefiles/images/fishspritesheet2.png";

// Jellyfish images
var jellyfishReady = false;
var jellyfishImage = new Image();
jellyfishImage.onload = function () {
    jellyfishReady = true;
};
jellyfishImage.src = "/static/gamefiles/images/jellyfish2.png";


// Game objects
var shark = {
    speed: 256, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var fish = {
    speed: 150,
    x: 0,
    y: 0,
    xbool: false,
    ybool: false
};
var jellyfish1 = {
    speed: 100,
    x: 0,
    y: 0,
    bool: true
};
var jellyfish2 = {
    speed: 100,
    x: 0,
    y: 0,
    bool: true
};
var jellyfish3 = {
    speed: 100,
    x: 0,
    y: 0,
    xbool: false,
    ybool: false
};
var fishEaten = 0;
let lostGame = false;
var counter = 0;
var fishcounter = 0;


// Handle keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Update game objects
var update = function (modifier) {

    ctx.clearRect(shark.x, shark.y, width, height);
    left = false;
    right = false;

    if (38 in keysDown) { //  holding up key
        shark.y -= shark.speed * modifier;
        if (shark.y < 0) {
            shark.y = 0;
        }
        left = false;
        right = false;
        up = true;
        down = false;
    }
    if (40 in keysDown) { //  holding down key
        shark.y += shark.speed * modifier;
        if (shark.y > (canvas.height - 180)) {
            shark.y = (canvas.height - 180);
        }
        left = false;
        right = false;
        up = false;
        down = true;
    }
    if (37 in keysDown) { // holding left key
        shark.x -= shark.speed * modifier;
        if (shark.x < 0) {
            shark.x = 0;
        }
        left = true;
        right = false;
        up = false;
        down = false;
    }
    if (39 in keysDown) { // holding right key
        shark.x += shark.speed * modifier;
        if (shark.x > (canvas.width - 200)) {
            shark.x = (canvas.width - 200);
        }
        left = false;
        right = true;
        up = false;
        down = false;
    }

    //Control fish directions
    if(fish.xbool) {
        fish.x += fish.speed * modifier;
        fishleft = false;
        fishright = true;
    }
    if (!fish.xbool) {
        fish.x -= fish.speed * modifier;
        fishleft = true;
        fishright = false;
    }
    if(fish.ybool) {
        fish.y += fish.speed * modifier;
    }
    if (!fish.ybool) {
        fish.y -= fish.speed * modifier;
    }

    //Control jellyfish directions
    if(jellyfish1.bool) {
        jellyfish1.x += jellyfish1.speed * modifier;
        jellyfish1.y += jellyfish1.speed * modifier;
    }
    if (!jellyfish1.bool) {
        jellyfish1.x -= jellyfish1.speed * modifier;
        jellyfish1.y -= jellyfish1.speed * modifier;
    }
    if(jellyfish2.bool) {
        jellyfish2.x += jellyfish2.speed * modifier;
        jellyfish2.y -= jellyfish2.speed * modifier;
    }
    if (!jellyfish2.bool) {
        jellyfish2.x -= jellyfish2.speed * modifier;
        jellyfish2.y += jellyfish2.speed * modifier;
    }
    if(jellyfish3.xbool) {
        jellyfish3.x += jellyfish3.speed * modifier;
    }
    if (!jellyfish3.xbool) {
        jellyfish3.x -= jellyfish3.speed * modifier;
    }
    if(jellyfish3.ybool) {
        jellyfish3.y += jellyfish3.speed * modifier;
    }
    if (!jellyfish3.ybool) {
        jellyfish3.y -= jellyfish3.speed * modifier;
    }


    //  Checks if shark is touching fish
    if (
        shark.x <= (fish.x + 75)
        && fish.x <= (shark.x +50)
        && shark.y <= (fish.y + 50)
        && fish.y <= (shark.y + 75)
    ) {
        soundEfx.src = soundEaten;
        soundEfx.play(); 
        ++fishEaten;       // keep track of score
        //Wins when you eat 3 fish
        if (fishEaten == 3) {
            document.getElementById('sound').play();
            alert("You won!");
            keysDown = {};
            gameOver = true;

            window.location.reload();
            
        }
        reset();
    }

    //Animate shark
    if (counter == 10) { // adjust this to change "walking speed" of animation
        curXFrame = ++curXFrame % frameCount;
        counter = 0;
    } else {
        counter++;
    }
    
    srcX = curXFrame * width;
    if (left) {
        srcY = trackLeft * height;
    }
    if (right) {
        srcY = trackRight * height;
    }
    if (up) {
        srcY = trackUp * height;
    }
    if (down) {
        srcY = trackDown * height;
    }

    //Animate fish
    if (fishcounter == 5) { // adjust this to change "walking speed" of animation
        fishcurXFrame = ++fishcurXFrame % frameCount;
        fishcounter = 0;
    } else {
        fishcounter++;
    }
    
    fishsrcX = fishcurXFrame * fishwidth;
    if (fishleft) {
        fishsrcY = fishtrackLeft * fishheight;
    }
    if (fishright) {
        fishsrcY = fishtrackRight * fishheight;
    }

    //  Checks if shark is touching jellyfish
    if (
        shark.x <= (jellyfish1.x + 50)
        && jellyfish1.x <= (shark.x + 125)
        && shark.y <= (jellyfish1.y + 75)
        && jellyfish1.y <= (shark.y + 125)
    ) {
        soundEfx.src = soundEaten;
        soundEfx.play(); 
        gameOver();
        window.location.reload();
    }

    if (
        shark.x <= (jellyfish2.x + 50)
        && jellyfish2.x <= (shark.x + 125)
        && shark.y <= (jellyfish2.y + 75)
        && jellyfish2.y <= (shark.y + 125)
    ) {
        soundEfx.src = soundEaten;
        soundEfx.play(); 
        gameOver();
        window.location.reload();
    }

    if (
        shark.x <= (jellyfish3.x + 50)
        && jellyfish3.x <= (shark.x + 125)
        && shark.y <= (jellyfish3.y + 75)
        && jellyfish3.y <= (shark.y + 125)
    ) {
        soundEfx.src = soundEaten;
        soundEfx.play(); 
        gameOver();
        window.location.reload();
    }

    //If fish touches edge
    if (fish.x <= 0) {
        fish.xbool = true;
        fish.x += fish.speed * modifier;
        fishright = true;
        fishleft = false;
    }
    if (fish.x >= 1300) {
        fish.xbool = false;
        fish.x -= fish.speed * modifier;
        fishright = false;
        fishleft = true;
    }
    if (fish.y <= 0) {
        fish.ybool = true;
        fish.y += fish.speed * modifier;
    }
    if (fish.y >= 660) {
        fish.ybool = false;
        fish.y -= fish.speed * modifier;
    }

    //if jellyfish touches edge
    if (jellyfish1.x <= 0 || jellyfish1.y < 0) {
        jellyfish1.bool = true;
        jellyfish1.x += jellyfish1.speed * modifier;
        jellyfish1.y += jellyfish1.speed * modifier;
    }
    if (jellyfish1.x > (canvas.width-100) || jellyfish1.y > (canvas.height-100)) {
        jellyfish1.bool = false;
        jellyfish1.x -= jellyfish1.speed * modifier;
        jellyfish1.y -= jellyfish1.speed * modifier;
    }
    if (jellyfish2.x <= 0 || jellyfish2.y > (canvas.height-100)) {
        jellyfish2.bool = true;
        jellyfish2.x += jellyfish2.speed * modifier;
        jellyfish2.y -= jellyfish2.speed * modifier;
    }
    if (jellyfish2.x > (canvas.width-100) || jellyfish2.y < 0) {
        jellyfish2.bool = false;
        jellyfish2.x -= jellyfish2.speed * modifier;
        jellyfish2.y += jellyfish2.speed * modifier;
    }
    if (jellyfish3.x <= 0) {
        jellyfish3.xbool = true;
        jellyfish3.x += jellyfish3.speed * modifier;
    }
    if (jellyfish3.x >= (canvas.width-100)) {
        jellyfish3.xbool = false;
        jellyfish3.x -= jellyfish3.speed * modifier;
    }
    if (jellyfish3.y <= 0) {
        jellyfish3.ybool = true;
        jellyfish3.y += jellyfish3.speed * modifier;
    }
    if (jellyfish3.y >= (canvas.height-100)) {
        jellyfish3.ybool = false;
        jellyfish3.y -= jellyfish3.speed * modifier;
    }
};

var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    // Score image
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Fish eaten: " + fishEaten, 32, 32);

    if (sharkReady) {
         ctx.drawImage(sharkImage, srcX, srcY, width, height, shark.x, shark.y, width, height);
    }
    if (fishReady) {
        ctx.drawImage(fishImage, fishsrcX, fishsrcY, fishwidth, fishheight, fish.x, fish.y, fishwidth, fishheight);
    }
    if (jellyfishReady) {
        ctx.drawImage(jellyfishImage, jellyfish1.x, jellyfish1.y);
        ctx.drawImage(jellyfishImage, jellyfish2.x, jellyfish2.y);
        ctx.drawImage(jellyfishImage, jellyfish3.x, jellyfish3.y);
    }
}

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    requestAnimationFrame(main);
};

// Reset the game when the player catches a fish
var reset = function () {
    shark.x = canvas.width / 2;
    shark.y = 250;
    placeItem(fish);
    placeItem(jellyfish1);
    placeItem(jellyfish2);
    placeItem(jellyfish3);
};

var placeItem = function(item) { //ensures fish + jellys don't start too close to shark
    let xposition = (canvas.width)/2;
    let yposition = (canvas.height)/2;
    while (xposition >= canvas.width/2-100 && xposition <= canvas.width/2+100) {
        xposition = Math.random() * canvas.width;
    }
    while (yposition >= canvas.height/2-100 && yposition <= canvas.height/2+100) {
        yposition = Math.random() * canvas.height;
    }
    item.x = xposition;
    item.y = yposition;
}

//when fish touches jellyfish
let gameOver = function(item) {
    document.getElementById('soundgamelost').play();
    alert("You got stung by a jellyfish, game over!");
    keysDown = {};
    gameOver = true;
    reset();
    fishEaten = 0;
}

var then = Date.now();
reset();
main();


/* function runGame() {
    playAudio(document.getElementById("audio"), 0, 1);
    startGame();
}
document.getElementById("start-screen").addEventListener("click"), function )_ {
    document.getelementById
} */
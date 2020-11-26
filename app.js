var canvas = document.getElementById(`canvas`);
var ctx = canvas.getContext(`2d`);

var sprite = {
    
    x: 0,
    y: 0,
    xVel: 0,
    yVel: 0,
    fri: 0.1,
    acc: 0.5,
    rebound: -0.25
    
}

var keydown = {
    
    right: false,
    left: false,
    up: false,
    down: false
    
}

var lasers = [];

var gameOver = false;

var cooldown = 2000;

function gameLoop(){
    
    if(!gameOver){
    
    ctx.clearRect(0, 0, 300, 300);
    
    ctx.fillStyle = "darkgrey";
    ctx.fillRect(sprite.x, sprite.y, 15, 15);
    
    movementLogic();
    
    Lasers();
    
    requestAnimationFrame(gameLoop);
    
    }else{
        
       ctx.fillStyle = "black"
       ctx.fillRect(0, 0, 600, 600);
        
    }
    
}

function movementLogic(){
    
    if(keydown.right){
        
        sprite.xVel += sprite.acc;
        
    }
    
    if(keydown.left){
        
        sprite.xVel += (sprite.acc * -1);
        
    }
    
    if(keydown.down){
        
        sprite.yVel += (sprite.acc * -1);
        
    }
    
    if(keydown.up){
        
        sprite.yVel += sprite.acc;
        
    }
    
    if(sprite.xVel < 0){
        
        sprite.xVel += sprite.fri;
        
    }
    
    if(sprite.xVel > 0){
        
        sprite.xVel -= sprite.fri;
        
    }
    
    if(sprite.yVel < 0){
        
        sprite.yVel += sprite.fri;
        
    }
    
    if(sprite.yVel > 0){
        
        sprite.yVel -= sprite.fri;
        
    }
    
    if(sprite.x < 0){
        
        sprite.xVel *= sprite.rebound;
        sprite.x = 0;
        
    }
    
    if(sprite.x > 285){
        
        sprite.xVel *= sprite.rebound;
        sprite.x = 285;
        
    }
    
    if(sprite.y < 0){
        
        sprite.yVel *= sprite.rebound;
        sprite.y = 0;
        
    }
    
    if(sprite.y > 285){
        
        sprite.yVel *= sprite.rebound;
        sprite.y = 285;
        
    }
    
    sprite.x += sprite.xVel;
    sprite.y += sprite.yVel;
    
}

document.onkeydown = function(e){
    
    if(!e.repeat){
    
    if(e.key == "ArrowRight" || e.key == "a"){
        
        keydown.right = true;
        
    }
    
    if(e.key == "ArrowLeft" || e.key == "d"){
        
        keydown.left = true;
        
    }
    
    if(e.key == "ArrowDown" || e.key == "s"){
        
        keydown.up = true;
        
    }
    
    if(e.key == "ArrowUp" || e.key == "w"){
        
        keydown.down = true;
        
    }
    
    }
    
}

document.onkeyup = function(e){
    
    if(e.key == "ArrowRight" || e.key == "a"){
        
        keydown.right = false;
        
    }
    
    if(e.key == "ArrowLeft" || e.key == "d"){
        
        keydown.left = false;
        
    }
    
    if(e.key == "ArrowDown" || e.key == "s"){
        
        keydown.up = false;
        
    }
    
    if(e.key == "ArrowUp" || e.key == "w"){
        
        keydown.down = false;
        
    }
    
}

window.onblur = function(){
    
    keydown.right = false;
    keydown.left = false;
    keydown.up = false;
    keydown.up = false;
    
}

function createLaser(x, time){
    
    lasers.push(JSON.parse(` { "x": ${x}, "width": 1, "time": ${time} }`));
    
}

function Lasers(){
    
    for(var i = 0; i < lasers.length; i++){
        
        if(lasers[i].width === false){
            
            ctx.fillStyle = "#800000";
            
            ctx.fillRect(lasers[i].x - 15, 0, 30, 600);
            
            lasers[i].cycles++;
            
            if(sprite.x > lasers[i].x - 15 && sprite.x < (lasers[i].x - 15) + 30){
                
                gameOver = true;
                
            }
            
            if(lasers[i].cycles > lasers[i].time){
                
                lasers.splice(i, 1);
                
            }
            
        }else{
            
            ctx.fillStyle = "darkgrey";
            
            ctx.fillRect(lasers[i].x - (lasers[i].width / 2), 0, lasers[i].width, 600);
            
            lasers[i].width += 0.25;
            
            if(lasers[i].width > 30){
                
                lasers[i].width = false;
                
                lasers[i].cycles = 0
                
            }
            
        }
        
    }
    
}

function randomLaser(){
    
    setTimeout(function(){
        
        createLaser(Math.floor(Math.random() * 600 - 30), 100)
        
        if(!gameOver){
        
        randomLaser();
        
        }
        
        cooldown /= 1.0025
        
    }, Math.random() * cooldown);
    
}

randomLaser();

gameLoop();

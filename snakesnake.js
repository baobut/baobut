const canvas = document.getElementById('snakesnake');
const ctx = canvas.getContext('2d');
// tốc độ game tăng theo điểm
let speed = 7;

// số lượng ô sẽ có ở màn hình
let tileCount = 20;
// kích cỡ ô
let tileSize = canvas.width / tileCount - 2;
// kích cỡ rắn (x)
let headx = 10;
// kích cỡ rắn (y)
let heady = 10;

// vị trí rắn
let xvelocity = 0;
let yvelocity = 0;

let bom=0;

let snaketail=2;

let score=0;

// vị trí táo
let applex=5;
let appley=5;


const snakeparts = [];

class snakepart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}




// vẽ game
function vegame(){
    changesnakevitri();
    let result=isgameover();
    if(result)
    {
        return;
    }
    resetscreen();
    checkapple();
    veran();    
    vetao();
    vediem();
   
    setTimeout(vegame, 1000/ speed);
}

function isgameover()
{

    let gameover=false;
    if (xvelocity==0&&yvelocity==0)
    {
        return false;
    }

    if (headx < 0)
    {
        gameover=true;
    }
    else if (headx == tileCount)
    {
        gameover=true;
    }
    else if (heady < 0)
    {
        gameover=true;
    }
    else if (heady == tileCount)
    {
        gameover=true;
        
    }
    for (let i=0;i < snakeparts.length;i++)
    {
        let part=snakeparts[i];
        if (part.x===headx&&part.y===heady)
        {
            gameover=true;
            break;
        }
    }
    if (gameover)
    {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!",canvas.width/7,canvas.height/2);

        ctx.fillStyle = "white";
        ctx.font = "25px Verdana";
        ctx.fillText("You score is "+ score,canvas.width/3.5,canvas.height/1.8);

    }
    return gameover;
}

// reset screen
function resetscreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

// vẽ rắn1
function veran(){
    ctx.fillStyle = ('orange');
    ctx.fillRect(headx * tileCount, heady * tileCount, tileSize,tileSize);

    ctx.fillStyle = ('green');
    for (let i=0;i < snakeparts.length;i++)
    {
        let part=snakeparts[i];
        ctx.fillRect(part.x*tileCount, part.y*tileCount,tileSize,tileSize);
    }
    snakeparts.push(new snakepart(headx,heady));
    if (snakeparts.length > snaketail)
    {
        snakeparts.shift();
    }


}

function changesnakevitri()
{
    headx=headx+xvelocity;
    heady=heady+yvelocity;
}

function vetao()
{
    ctx.fillStyle = ("red");
    ctx.fillRect(applex*tileCount,appley*tileCount,tileSize,tileSize);

    
}

function vediem()
{
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width-50,10);
}

function checkapple()
{
    if (applex === headx && appley === heady)
    {
        ramdom=Math.random();
        applex = Math.floor(ramdom * tileCount);
        appley = Math.floor(ramdom * tileCount);
        snaketail++;
        score++;
    }
}
document.body.addEventListener('keydown', keyDown);

//lên
function keyDown(event) 
{
    if (event.keyCode==38)
    {
        if (yvelocity==1)
        {
            return;
        }
        yvelocity=-1;
        xvelocity=0;
    }
//xuống
    if (event.keyCode==40)
    {
        if (yvelocity==-1)
        {
            return;
        }
        yvelocity=1;
        xvelocity=0;
    }
//trái
    if (event.keyCode==37)
        {
            if (xvelocity==1)
        {
            return;
        }
            yvelocity=0;
            xvelocity=-1;
        }
//phải
    if (event.keyCode==39)
        {   
            if (xvelocity==-1)
        {
            return;
        }
            yvelocity=0;
            xvelocity=1;
        }
}

vegame();
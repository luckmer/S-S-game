document.addEventListener("DOMContentLoaded" , ()=>{
    const character = document.querySelector(".character");
    const grid = document.querySelector(".game");
    const Counter = document.querySelector(".counter");
    const Button = document.querySelector("button");
    const Point = document.querySelector(".points")
    const colors = ["red","tomato","orange"];
    const width  =[70,140];
    let right = 0;
    let points= 0;
    let counter = 0;    
    let left;
    let testLeft;

    function moveLeft(){
        right > 140 ? right -=70 : right += 70
        character.style.left = right + "px";
    };

    function moveRight(){
        right < 0 ? right += 70 : right -= 70
        character.style.left = right + "px";
    };

    function Block(){
        let { top, block, left,nextTop,testLeft} = LetBaseContext(colors, width, BlockStyles);
        const money = Points(grid, nextTop);
        
        function moveBlock(){
            counter = Collision(top, left, right, counter, grid, block, timerId);
            moneyCollision(nextTop,right,money);
            top += 2;
            nextTop+= 2;
            if (top === 400) {
                clearInterval(timerId);
                grid.removeChild(block);
                grid.removeChild(money)
            }
            
            money.style.top = nextTop + "px";
            money.style.left = testLeft + "px";
            block.style.top = top + "px";
            block.style.left =left + "px";
            Counter.innerHTML = "way: " + counter++;
        };
        let timerId = setInterval(moveBlock, 2);
        setTimeout(Block, 1000);
    };
    

    function LetBaseContext(colors, width, BlockStyles) {
        let h = Math.floor(Math.random() * 3);
        let randomWith = Math.floor(Math.random() * width.length);
        let randomColor = Math.floor(Math.random() * colors.length);
        let randomPlace = Math.floor(Math.random() * h)
        let control =  Math.floor(Math.random() * 3);
        let randomWithContext = width[randomWith];
        let block = BlockStyles(randomColor, randomWithContext);
        let top = -100;
        let nextTop = -30
        left = h * 70;
        testLeft = randomPlace * 70
        if(left === 0 || testLeft === 0){
            left = h* 70 + 70
            testLeft=h* 70 - 70
        }

    return { top, block, left,control,nextTop,testLeft };
}

    function BlockStyles(randomColor,randomWithContext  ) {
        let block = document.createElement("div");
        block.classList.add("block");
        block.style.backgroundColor = colors[randomColor];
        block.style.top = top + "px";
        block.style.width = randomWithContext + "px";
        grid.appendChild(block);
        return block;
    };

    function Points(grid, nextTop) {
        let money = document.createElement("div");
        money.classList.add("money");
        money.style.top = nextTop + "px";
        grid.appendChild(money);
        return money;
    }


    function moneyCollision(nextTop,right,money){
        if (nextTop < 265 && nextTop > 262 && testLeft === right) {
            money.classList.add("Delete")
            Point.innerHTML = "Points : " + points++
        }
        
    }
    function Collision(top, left, right, counter, grid, block, timerId) {
        console.log(points)
        if (top < 400 && top > 262 && left === right) {       
            counter = 0;
            grid.removeChild(block);
            grid.removeChild(grid.firstChild);
            clearInterval(timerId);
            alert("you lose ");
        };
        return counter;
    };


    function start(){
        Block();
    };
    
    function joystick(e){
        if(e.keyCode === 68){
            moveLeft();
        }else if (e.keyCode === 65){
            moveRight();
        };
    };

    Button.addEventListener("click" , start)
    document.addEventListener("keyup", joystick);
})


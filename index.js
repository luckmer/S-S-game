document.addEventListener("DOMContentLoaded" , ()=>{
    const character = document.querySelector(".character");
    const grid = document.querySelector(".game");
    const Counter = document.querySelector(".counter");
    const Button = document.querySelector("button");
    const colors = ["red","tomato","orange"];
    const width  =[70,140];
    let right = 0;
    let counter = 0 ;    

    function moveLeft(){
        right > 140 ? right -=70 : right += 70
        character.style.left = right + "px";
    };

    function moveRight(){
        right < 0 ? right += 70 : right -= 70
        character.style.left = right + "px";
    };

    function Block(){
        let { top, block, left } = LetBaseContext(colors, width, BlockStyles);

        function moveBlock(){
            top += 2;
            if (top === 400) {
                clearInterval(timerId);
                grid.removeChild(block);
            }
            counter = Collision(top, left, right, counter, grid, block, timerId);
            block.style.top = top + "px";
            block.style.left =left + "px";
            Counter.innerHTML = "way: " + counter++;
        };
        let timerId = setInterval(moveBlock, 2);
        setTimeout(Block, 1000);
    };
    

    function LetBaseContext(colors, width, BlockStyles) {
        let randomColor = Math.floor(Math.random() * colors.length);
        let randomWith = Math.floor(Math.random() * width.length);
        let randomWithContext = width[randomWith];
        let block = BlockStyles(randomColor, randomWithContext);
        let h = Math.floor(Math.random() * 3);
        let left = h * 70;
        let top = -100;
    return { top, block, left };
}



    function Collision(top, left, right, counter, grid, block, timerId) {
        if (top < 400 && top > 262 && left === right) {
            counter = 0;
            grid.removeChild(block);
            grid.removeChild(grid.firstChild);
            clearInterval(timerId);
            alert("you lose ");
        };

        return counter;
    };

    function BlockStyles(randomColor,randomWithContext  ) {
        let block = document.createElement("div");
        block.classList.add("block");
        block.style.backgroundColor = colors[randomColor];
        block.style.top = top + "px";
        block.style.width = randomWithContext + "px";
        grid.appendChild(block);
        return block;
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

// ПЕРЕМЕННЫЕ

let rightPosition = 0;
let heroPosition = 0;
let direction = 'right';
let hit = false;
let jump = false;
let timer = null;
let x = 0;
let halfWidth = window.screen.width / 2;
let jumpBlock = window.document.querySelector('.jump-block');
let hitBlock = window.document.querySelector('.hit-block');
let heroImg = window.document.querySelector('.hero__img');
let hero = window.document.querySelector('.hero');
let canvas = window.document.querySelector('.canvas');
let fsBtn = window.document.querySelector('.fsbtn');

jumpBlock.style.top = `${window.screen.height/2 - 144/2}px`;
hitBlock.style.top = `${window.screen.height/2 - 144/2}px`;
heroImg.onclick = (Event) => {
    Event.preventDefault();
}
fsBtn.onclick = () => {
    if (window.document.fullscreen) {
        fsBtn.src = 'images/fullscreen.png';
        window.document.exitFullscreen();
    } else {
        fsBtn.src = 'images/cancel.png';
        canvas.requestFullscreen();
    }
}
jumpBlock.onclick = () => {jump = true};
hitBlock.onclick = () => {hit = true};

// ФУНКЦИИ

const rightHandler = () => {
    heroImg.style.transform = "scale(-1,1)";
    rightPosition += 1;
    heroPosition += 1;
    if (rightPosition > 5) {
        rightPosition = 0;
    }
    heroImg.style.left = `-${rightPosition * 96}px`;
    heroImg.style.top = '-192px';
    hero.style.left = `${heroPosition * 20}px`;
}
const leftHandler = () => {
    heroImg.style.transform = "scale(1,1)";
    rightPosition += 1;
    heroPosition -= 1;
    if (rightPosition > 5) {
        rightPosition = 0;
    }
    heroImg.style.left = `-${rightPosition * 96}px`;
    heroImg.style.top = '-192px';
    hero.style.left = `${heroPosition * 20}px`;
}

const standHandler = () => { 
    switch (direction) {
        case 'right': {
            heroImg.style.transform = "scale(-1,1)";
            if (rightPosition > 4) {
        rightPosition = 1;
    }
            break
        }
         case 'left': {
            heroImg.style.transform = "scale(1,1)";
            if (rightPosition > 3) {
        rightPosition = 0;
    }
            break
        }
        default: break;
    }
    rightPosition += 1;
    heroImg.style.left = `-${rightPosition * 96}px`;
    heroImg.style.top = '0px';
}
const hitHandler = () => {
    switch (direction) {
        case 'right': {
            heroImg.style.transform = "scale(-1,1)";
            if (rightPosition > 4) {
        rightPosition = 1;
        hit = false;
    }
            break
        }
         case 'left': {
            heroImg.style.transform = "scale(1,1)";
            if (rightPosition > 3) {
        rightPosition = 0;
        hit = false;
    }
            break
        }
        default: break;
    }
    rightPosition += 1;
    heroImg.style.left = `-${rightPosition * 96}px`;
    heroImg.style.top = '-288px';

}
const jumpHandler = () => {
    switch (direction) {
        case 'right': {
            heroImg.style.transform = "scale(-1,1)";
            if (rightPosition > 4) {
        rightPosition = 1;
        jump = false;
    }
            break
        }
         case 'left': {
            heroImg.style.transform = "scale(1,1)";
            if (rightPosition > 3) {
        rightPosition = 0;
        jump = false;
    }
            break
        }
        default: break;
    }
    rightPosition += 1;
    heroImg.style.left = `-${rightPosition * 96}px`;
    heroImg.style.top = '-96px';

}

//ОБРАБОТЧИКИ СОБЫТИЙ

let onTouchStart = (Event) => {
    clearInterval(timer);
    if (Event.type === 'mousedown') {
        x = Event.screenX;
    } else {
        x = Event.touches[0].screenX;
    }
    timer = setInterval(() => {
        
        if(x > halfWidth) {
            direction = 'right';
            rightHandler();

        }else {
            direction = 'left';
            leftHandler();
        }

        }, 130)   

}
let onTouchEnd = (Event) => {
    clearInterval(timer);
    lifeCycle();
}

//window.onpointerdown = onTouchStart;
window.onmousedown = onTouchStart;
window.ontouchstart = onTouchStart;

//window.onpointerup = onTouchEnd;
window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;

const lifeCycle = () => {
    timer = setInterval(()=>{
        if(hit) {
            hitHandler();
        } else if (jump) {
            jumpHandler();
        } else {
            standHandler();
        }
        
    },150);
} 
const createTile = (x, y = 1) => {
let tile = window.document.createElement('img');
tile.src = 'assets/1 Tiles/Tile_02.png';
tile.style.position = 'absolute';
tile.style.left = `${x * 32}px`;
tile.style.bottom = `${y * 32}px`;
canvas.appendChild(tile);   
}

const createTilesPlatform = (startX, startY, length) => {
    for(let i = 0; i < length; i++){
      createTile(startX + i, startY);
    } 
}

const addTiles = (i) => {
createTile(i);
let tileBlack = window.document.createElement('img');
tileBlack.src = 'assets/1 Tiles/Tile_04.png';
tileBlack.style.position = 'absolute';
tileBlack.style.left = `${i * 32}px`;
tileBlack.style.bottom = 0;
canvas.appendChild(tileBlack);
}

const start = () => {
    lifeCycle();
    for(let i = 0; i < 60; i++){
      addTiles(i);
    }
    createTilesPlatform(10, 10, 10);
    createTilesPlatform(15, 5, 10);
}
start();
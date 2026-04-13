// ПЕРЕМЕННЫЕ

let heroImg = window.document.querySelector('.hero_img');
heroImg.onclick = (Event) => {
    Event.preventDefault();
}
let hero = window.document.querySelector('.hero');
let canvas = window.document.querySelector('.canvas');
let fsBtn = window.document.querySelector('.fsbtn');
fsBtn.onclick = () => {
    if (window.document.fullscreen) {
        fsBtn.src = 'images/fullscreen.png';
        window.document.exitFullscreen();
    } else {
        fsBtn.src = 'images/cancel.png';
        canvas.requestFullscreen();
    }
}
let rightPosition = 0;
let heroPosition = 0;
let direction = 'right';
// ФУНКЦИИ

const rightHandler = () => {
    heroImg.style.transform = "scale(-1,1)";
    rightPosition += 1;
    heroPosition += 1;
    if (rightPosition > 5) {
        rightPosition = 0;
    }
    heroImg.style.left = `-${rightPosition * 288}px`;
    heroImg.style.top = '-576px';
    hero.style.left = `${heroPosition * 20}px`;
}
const leftHandler = () => {
    heroImg.style.transform = "scale(1,1)";
    rightPosition += 1;
    heroPosition -= 1;
    if (rightPosition > 5) {
        rightPosition = 0;
    }
    heroImg.style.left = `-${rightPosition * 288}px`;
    heroImg.style.top = '-576px';
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
    heroImg.style.left = `-${rightPosition * 288}px`;
    heroImg.style.top = '0px';

}

//ОБРАБОТЧИКИ СОБЫТИЙ
let timer = null;
const lifeCycle = () => {
    timer = setInterval(()=>{
        standHandler();
    },150);
} 
let x = 0;
let halfWidth = window.screen.width / 2;
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

const start = () => {
    lifeCycle
}
start();
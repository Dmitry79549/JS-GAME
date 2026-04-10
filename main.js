// ПЕРЕМЕННЫЕ

let heroImg = window.document.querySelector('.hero_img');
let hero = window.document.querySelector('.hero');
let rightPosition = 0;
let heroPosition = 0;

// ФУНКЦИИ

const rightHandler = () => {
    heroImg.style.transform = "scale(-1,1)";
    rightPosition += 1;
    heroPosition += 1;
    if (rightPosition > 5) {
        rightPosition = 0;
    }
    heroImg.style.left = `-${rightPosition * 288}px`;
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
    hero.style.left = `${heroPosition * 20}px`;
}

//ОБРАБОТЧИКИ СОБЫТИЙ
let timer = null;
let x = 0;
let halfWidth = window.screen.width / 2;
let onTouchStart = (Event) => {
    //Event.preventDefault();
    if (Event.type === 'mousedown') {
        x = Event.screenX;
    } else {
        x = Event.touches[0].screenX;
    }
    timer = setInterval(() => {
        (x > halfWidth) ? rightHandler() : leftHandler();

    }, 130)

}
let onTouchEnd = (Event) => {
    //Event.preventDefault();
    clearInterval(timer);
}

//window.onpointerdown = onTouchStart;
window.onmousedown = onTouchStart;
window.ontouchstart = onTouchStart;

//window.onpointerup = onTouchEnd;
window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;
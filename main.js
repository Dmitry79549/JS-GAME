// ПЕРЕМЕННЫЕ

let heroImg = window.document.querySelector('.hero_img');
let hero = window.document.querySelector('.hero');
let rightPosition = 0;
let heroPosition = 0;

// ФУНКЦИИ

const rightHandler = () => {
    rightPosition += 1;
    heroPosition += 1;
    if (rightPosition > 5) {
        rightPosition = 0;
    }
    heroImg.style.left = `-${rightPosition * 288}px`;
    hero.style.left = `${heroPosition * 20}px`;
}

//ОБРАБОТЧИКИ СОБЫТИЙ
let timer = null;
let onTouchStart = (Event) => {
    timer = setInterval(() => {
        rightHandler();
    }, 130)

}
let onTouchEnd = (Event) => {
    clearInterval(timer);
}

window.onmousedown = onTouchStart;
window.ontouchstart = onTouchStart;

window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;
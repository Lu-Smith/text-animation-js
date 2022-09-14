//scroll animation

const boxes = document.querySelectorAll(`.box`);

window.addEventListener(`scroll`, checkBoxes);

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4;

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if(boxTop < triggerBottom) {
            box.classList.add(`show`);
        } else {
            box.classList.remove(`show`);
        }
    })
}

//subtitle
const text = document.getElementById('subtitle');
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = "";

for (let i = 0; i < splitText.length; i++) {
    text.innerHTML += "<span>" + splitText[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick(){
    const spans = text.querySelectorAll('span')[char];
    spans.classList.add('fade');
    char++
    if(char === splitText.length) {
        complete();
        return;
    }
}

function complete() {
    clearInterval(timer);
    timer = null;

}

//camvas1
const canvas1 = document.getElementById('canvas1');
const container1 = document.getElementById('container1');
const ctx1 = canvas1.innerHTML('2d');

canvas1.width = container1.offsetWidth;
canvas1.height = container1.offsetHeight;
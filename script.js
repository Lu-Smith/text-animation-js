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
const ctx1 = canvas1.getContext('2d');
const particlesArray1 = [];

canvas1.width = container1.offsetWidth;
canvas1.height = container1.offsetHeight;

const mouse1 = {
    x: null,
    y: null,
    radius: 80
}

canvas1.addEventListener('mousemove', function(event) {
    mouse1.x = event.x - canvas1.getBoundingClientRect().left;
    mouse1.y = event.y - canvas1.getBoundingClientRect().top;
    mouse1.radius = 80;
})

ctx1.fillStyle = 'white';
ctx1.font = '90px Verdana';
ctx1.fillText('Hello', 140, 220);

const data1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

class Particle1 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }
    draw(){
        ctx1.fillStyle = 'red';
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx1.closePath();
        ctx1.fill();
    }
    update(){
        let dx = mouse1.x - this.x;
        let dy = mouse1.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse1.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse1.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            this.size = 3;
        }
    }
}

function init1() {
    for (let i = 0; i < 500; i++) {
        let x = Math.random() * canvas1.width;
        let y = Math.random() * canvas1.height;
        particlesArray1.push(new Particle1(x, y));
    }
}

init1();

function animate1() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    for (let i = 0; i < particlesArray1.length; i++) {
        particlesArray1[i].draw();
        particlesArray1[i].update();
    }
    requestAnimationFrame(animate1);
}

animate1();

//camvas2
const canvas2 = document.getElementById('canvas2');
const container2 = document.getElementById('container2');
const ctx2 = canvas2.getContext('2d');
const particlesArray2 = [];

canvas2.width = container2.offsetWidth;
canvas2.height = container2.offsetHeight;

const mouse2 = {
    x: null,
    y: null,
    radius: 150
}

canvas2.addEventListener('mousemove', function(event) {
    mouse2.x = event.x - canvas2.getBoundingClientRect().left;
    mouse2.y = event.y - canvas2.getBoundingClientRect().top;
})

ctx2.fillStyle = 'white';
ctx2.font = '90px Verdana';
ctx2.fillText('Hello', 140, 220);

const data2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);

class Particle2 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }
    draw(){
        ctx2.fillStyle = 'red';
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx2.closePath();
        ctx2.fill();
    }
    update(){
        let dx = mouse2.x - this.x;
        let dy = mouse2.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            this.size = 10;
        } else {
            this.size = 3;
        }
    }
}

function init2() {
    for (let i = 0; i < 500; i++) {
        let x = Math.random() * canvas2.width;
        let y = Math.random() * canvas2.height;
        particlesArray2.push(new Particle2(x, y));
    }
}

init2();

function animate2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    for (let i = 0; i < particlesArray2.length; i++) {
        particlesArray2[i].draw();
        particlesArray2[i].update();
    }
    requestAnimationFrame(animate2);
}

animate2();
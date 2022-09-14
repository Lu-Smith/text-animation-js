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
    radius: 50
}

canvas1.addEventListener('mousemove', function(event) {
    mouse1.x = event.x - canvas1.getBoundingClientRect().left;
    mouse1.y = event.y - canvas1.getBoundingClientRect().top;
})

ctx1.fillStyle = '#dfd3c3';
ctx1.font = '120px Verdana';
ctx1.fillText('Hello', canvas1.width/4.9, canvas1.height/1.6);

const textCoordinates1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

class Particle1 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 5;
    }
    draw(){
        ctx1.fillStyle = '#dfd3c3';
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
            if ( this.x !== this.baseX ){
                let dx = this.x - this.baseX;
                this.x -= dx/20;
            } 
            if ( this.y !== this.baseY ){
                let dy = this.y - this.baseY;
                this.y -= dy/20;
            } 
        }
    }
}

function init1() {
    for (let y = 0, y2 = textCoordinates1.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates1.width; x < x2; x++) {
           if (textCoordinates1.data[(y * 4 * textCoordinates1.width) + (x * 4)] > 128) {
              let positionX = x;
              let positionY = y;
              particlesArray1.push(new Particle1(positionX, positionY));
           }
        }
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
const adjust2X = -17;
const adjust2Y = 12;

canvas2.width = container2.offsetWidth;
canvas2.height = container2.offsetHeight;

const mouse2 = {
    x: null,
    y: null,
    radius: 50
}

canvas2.addEventListener('mousemove', function(event) {
    mouse2.x = event.x - canvas2.getBoundingClientRect().left;
    mouse2.y = event.y - canvas2.getBoundingClientRect().top;
})

ctx2.fillStyle = '#dfd3c3';
ctx2.font = '30px Verdana';
ctx2.fillText('Code', 30, 30);

const textCoordinates2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);

class Particle2 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 5;
    }
    draw(){
        ctx2.fillStyle = '#596e79';
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx2.closePath();
        ctx2.fill();
    }
    update(){
        let dx = mouse2.x - this.x;
        let dy = mouse2.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse2.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse2.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if ( this.x !== this.baseX ){
                let dx = this.x - this.baseX;
                this.x -= dx/20;
            } 
            if ( this.y !== this.baseY ){
                let dy = this.y - this.baseY;
                this.y -= dy/20;
            } 
        }
    }
}

function init2() {
    for (let y = 0, y2 = textCoordinates2.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates2.width; x < x2; x++) {
           if (textCoordinates2.data[(y * 4 * textCoordinates2.width) + (x * 4)] > 128) {
              let positionX = x + adjust2X;
              let positionY = y + adjust2Y;
              particlesArray2.push(new Particle2(positionX * 5, positionY * 5));
           }
        }
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


//camvas3
const canvas3 = document.getElementById('canvas3');
const container3 = document.getElementById('container3');
const ctx3 = canvas3.getContext('2d');
const particlesArray3 = [];
const adjust3X = -5;
const adjust3Y = 12;

canvas3.width = container3.offsetWidth;
canvas3.height = container3.offsetHeight;

const mouse3 = {
    x: null,
    y: null,
    radius: 50
}

canvas3.addEventListener('mousemove', function(event) {
    mouse3.x = event.x - canvas3.getBoundingClientRect().left;
    mouse3.y = event.y - canvas3.getBoundingClientRect().top;
})

ctx3.fillStyle = '#dfd3c3';
ctx3.font = '30px Verdana';
ctx3.fillText('Tea', 30, 30);

const textCoordinates3 = ctx3.getImageData(0, 0, canvas3.width, canvas3.height);

class Particle3 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 5;
    }
    draw(){
        ctx3.fillStyle = '#596e79';
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx3.closePath();
        ctx3.fill();
    }
    update(){
        let dx = mouse3.x - this.x;
        let dy = mouse3.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse3.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse3.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if ( this.x !== this.baseX ){
                let dx = this.x - this.baseX;
                this.x -= dx/30;
            } 
            if ( this.y !== this.baseY ){
                let dy = this.y - this.baseY;
                this.y -= dy/30;
            } 
        }
    }
}

function init3() {
    for (let y = 0, y2 = textCoordinates3.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates3.width; x < x2; x++) {
           if (textCoordinates3.data[(y * 4 * textCoordinates3.width) + (x * 4)] > 128) {
              let positionX = x + adjust3X;
              let positionY = y + adjust3Y;
              particlesArray3.push(new Particle3(positionX * 5, positionY * 5));
           }
        }
    }
}

init3();

function animate3() {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    for (let i = 0; i < particlesArray3.length; i++) {
        particlesArray3[i].draw();
        particlesArray3[i].update();
    }
    requestAnimationFrame(animate3);
}

animate3();

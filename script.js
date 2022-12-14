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
ctx1.fillText('Hello', canvas1.width/4.8, canvas1.height/1.6);

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
const adjust2X = -14;
const adjust2Y = 12;


canvas2.width = container2.offsetWidth;
canvas2.height = container2.offsetHeight;

const mouse2 = {
    x: null,
    y: null,
    radius: 60
}

canvas2.addEventListener('mousemove', function(event) {
    mouse2.x = event.x - canvas2.getBoundingClientRect().left;
    mouse2.y = event.y - canvas2.getBoundingClientRect().top;
})

ctx2.fillStyle = '#f95959';
ctx2.font = '30px Georgia';
ctx2.fillText('Code', 30, 30);

const textCoordinates2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);

class Particle2 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 8;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 70) + 6;
    }
    draw(){
        ctx2.fillStyle = 'white';
        ctx2.beginPath();
        ctx2.rect(this.x, this.y, this.size, this.size);
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
                this.x -= dx/15;
            } 
            if ( this.y !== this.baseY ){
                let dy = this.y - this.baseY;
                this.y -= dy/15;
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
    connect2();
    requestAnimationFrame(animate2);
}

animate2();

function connect2() {
    for (let a = 0; a < particlesArray2.length; a++) {
        for (let b = a; b < particlesArray2.length; b++) {
            let dx = particlesArray2[a].x - particlesArray2[b].x;
            let dy= particlesArray2[a].y - particlesArray2[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 9) {
                if (mouse2.x < 70) {
                    ctx2.strokeStyle = '#f70776';
                } else if (mouse2.x > 250) {
                    ctx2.strokeStyle = '#6643b5';
                } else {
                    ctx2.strokeStyle = '#00aaa0';
                }
                ctx2.lineWidth = 2;
                ctx2.beginPath();
                ctx2.moveTo(particlesArray2[a].x, particlesArray2[a].y);
                ctx2.lineTo(particlesArray2[b].x, particlesArray2[b].y);
                ctx2.stroke();
            }
        }
    }
}


//camvas3
const canvas3 = document.getElementById('canvas3');
const container3 = document.getElementById('container3');
const ctx3 = canvas3.getContext('2d');
const particlesArray3 = [];
const adjust3X = -28;
const adjust3Y = -11;
let hue3 = 0;

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
ctx3.font = '25px Verdana';
ctx3.fillText('Tea', 40, 40);

const textCoordinates3 = ctx3.getImageData(0, 0, canvas3.width, canvas3.height);

class Particle3 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 5;
        hue3 = this.density;
        this.color = 'hsl(' + hue3 + ', 100%, 50%)';
    }
    draw(){
        let dx = mouse3.x - this.x;
        let dy = mouse3.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse3.radius) {
            ctx3.fillStyle = 'white';
        } else {
            ctx3.fillStyle = this.color;
        }
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
        let maxDistance = mouse3.radius * 2;
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
              particlesArray3.push(new Particle3(positionX * 8, positionY * 8));
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


//camvas4
const canvas4 = document.getElementById('canvas4');
const container4 = document.getElementById('container4');
const ctx4 = canvas4.getContext('2d');
const particlesArray4 = [];
const adjust4X = -27;
const adjust4Y = -11;

canvas4.width = container4.offsetWidth;
canvas4.height = container4.offsetHeight;

const mouse4 = {
    x: null,
    y: null,
    radius: 70
}

canvas4.addEventListener('mousemove', function(event) {
    mouse4.x = event.x - canvas4.getBoundingClientRect().left;
    mouse4.y = event.y - canvas4.getBoundingClientRect().top;
})

ctx4.fillStyle = '#dfd4c4';
ctx4.font = '30px Verdana';
ctx4.fillText('PI', 40, 40);

const textCoordinates4 = ctx4.getImageData(0, 0, canvas4.width, canvas4.height);

class Particle4 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 60) + 5;
    }
    draw(){
        let dx = mouse4.x - this.x;
        let dy = mouse4.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        ctx4.beginPath();
        if (distance > 100) {
            ctx4.fillStyle = '#8dc6ff';
            this.size = 3;
            ctx4.arc(this.x, this.y, this.size, 0, Math.PI);
        } else  if (distance < 50) {
            ctx4.fillStyle = '#f4aeba';
            this.size = 7;
            ctx4.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else {
            ctx4.fillStyle = '#fdfdcb';
            this.size = 5;
            ctx4.arc(this.x, this.y, this.size, 0, Math.PI);
        }
        
        
        ctx4.closePath();
        ctx4.fill();
    }
    update(){
        let dx = mouse4.x - this.x;
        let dy = mouse4.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse4.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse4.radius) {
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

function init4() {
    for (let y = 0, y2 = textCoordinates4.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates4.width; x < x2; x++) {
           if (textCoordinates4.data[(y * 4 * textCoordinates4.width) + (x * 4)] > 128) {
              let positionX = x + adjust4X;
              let positionY = y + adjust4Y;
              particlesArray4.push(new Particle4(positionX * 9, positionY * 9));
           }
        }
    }
}

init4();

function animate4() {
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
    for (let i = 0; i < particlesArray4.length; i++) {
        particlesArray4[i].draw();
        particlesArray4[i].update();
    }
    connect4();
    requestAnimationFrame(animate4);
}

animate4();

function connect4() {
    let opacityValue4 = 1;
    for (let a = 0; a < particlesArray4.length; a++) {
        for (let b = a; b < particlesArray4.length; b++) {
            let dx = particlesArray4[a].x - particlesArray4[b].x;
            let dy= particlesArray4[a].y - particlesArray4[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 15) {
                opacityValue4 = 1 - (distance/15);
                ctx4.strokeStyle = 'rgba(137, 113, 208,' + opacityValue4 + ')';
                ctx4.lineWidth = 5;
                ctx4.beginPath();
                ctx4.moveTo(particlesArray4[a].x, particlesArray4[a].y);
                ctx4.lineTo(particlesArray4[b].x, particlesArray4[b].y);
                ctx4.stroke();

            }
        }
    }
}


//camvas5
const canvas5 = document.getElementById('canvas5');
const container5 = document.getElementById('container5');
const ctx5 = canvas5.getContext('2d');
const particlesArray5 = [];
ctx5.lineWidth = 3;

canvas5.width = container5.offsetWidth;
canvas5.height = container5.offsetHeight;

const mouse5 = {
    x: null,
    y: null,
    radius: 100
}

canvas5.addEventListener('mousemove', function(event) {
    mouse5.x = event.x - canvas5.getBoundingClientRect().left;
    mouse5.y = event.y - canvas5.getBoundingClientRect().top;
})

ctx5.fillStyle = '#dfd5c5';
ctx5.font = '25px Verdana';
ctx5.fillText('&', 10, 21);

const textCoordinates5 = ctx5.getImageData(0, 0, canvas5.width, canvas5.height);

class Particle5 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 5) + 0.5;
        this.distance;
    }
    draw(){
        ctx5.fillStyle = 'rgba(255, 203, 203, 0.7)';
        ctx5.strokeStyle = 'rgba(162, 168, 211, 1)';
        ctx5.beginPath();

        if ( this.distance < mouse5.radius - 5) {
            this.size = 13;
            ctx5.strokeStyle = 'rgba(162, 168, 211, 1)';
            ctx5.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx5.stroke();
            ctx5.beginPath();
            ctx5.arc(this.x - 6, this.y - 5, this.size/3.5, 0, Math.PI * 2);
            ctx5.moveTo(this.x - 2, this.y + 4);
            ctx5.arc(this.x - 2, this.y + 4, this.size/2, 1.2, Math.PI);
        } else if ( this.distance <= mouse5.radius) {
            this.size = 10;
            ctx5.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx5.stroke();
            ctx5.beginPath();
            ctx5.arc(this.x - 2, this.y -2, this.size/3, 0, Math.PI * 2);
        } else {
            this.size = 8;
            ctx5.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx5.stroke();
            ctx5.beginPath();
            ctx5.arc(this.x - 1, this.y + 0.5, this.size/1.8, 0.7, Math.PI);
        }
        
        ctx5.closePath();
        ctx5.fill();
    }
    update(){
        let dx = mouse5.x - this.x;
        let dy = mouse5.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.distance = distance;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse5.radius * 3;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse5.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if ( this.x !== this.baseX ){
                let dx = this.x - this.baseX;
                this.x -= dx/40;
            } 
            if ( this.y !== this.baseY ){
                let dy = this.y - this.baseY;
                this.y -= dy/40;
            } 
        }
    }
}

function init5() {
    for (let y = 0, y2 = textCoordinates5.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates5.width; x < x2; x++) {
           if (textCoordinates5.data[(y * 4 * textCoordinates5.width) + (x * 4)] > 128) {
              let positionX = x;
              let positionY = y;
              particlesArray5.push(new Particle5(positionX * 14, positionY * 14));
           }
        }
    }
}

init5();

function animate5() {
    ctx5.clearRect(0, 0, canvas5.width, canvas5.height);
    for (let i = 0; i < particlesArray5.length; i++) {
        particlesArray5[i].draw();
        particlesArray5[i].update();
    }
    requestAnimationFrame(animate5);
}

animate5();


//camvas6
const canvas6 = document.getElementById('canvas6');
const container6 = document.getElementById('container6');
const ctx6 = canvas6.getContext('2d');
const particlesArray6 = [];

canvas6.width = container6.offsetWidth;
canvas6.height = container6.offsetHeight;

const mouse6 = {
    x: null,
    y: null,
    radius: 70
}

canvas6.addEventListener('mousemove', function(event) {
    mouse6.x = event.x - canvas6.getBoundingClientRect().left;
    mouse6.y = event.y - canvas6.getBoundingClientRect().top;
})

ctx6.fillStyle = '#dfd6c6';
ctx6.font = '18px Verdana';
ctx6.fillText('CAT', 4, 20);

const textCoordinates6 = ctx6.getImageData(0, 0, canvas6.width, canvas6.height);

class Particle6 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 60) + 6;
    }
    draw(){
        let dx = mouse6.x - this.x;
        let dy = mouse6.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 60) {
            ctx6.fillStyle = 'white';
            this.size = 2;
        } else {
            ctx6.fillStyle = 'grey';
            this.size = 6;
        } 
        ctx6.beginPath();
        ctx6.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx6.closePath();
        ctx6.fill();
    }
    update(){
        let dx = mouse6.x - this.x;
        let dy = mouse6.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse6.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse6.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if ( this.x !== this.baseX ){
                let dx = this.x - this.baseX;
                this.x -= dx/40;
            } 
            if ( this.y !== this.baseY ){
                let dy = this.y - this.baseY;
                this.y -= dy/40;
            } 
        }
    }
}

function init6() {
    for (let y = 0, y2 = textCoordinates6.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates6.width; x < x2; x++) {
           if (textCoordinates6.data[(y * 4 * textCoordinates6.width) + (x * 4)] > 128) {
              let positionX = x;
              let positionY = y;
              particlesArray6.push(new Particle6(positionX * 12, positionY * 12));
           }
        }
    }
}

init6();

function animate6() {
    ctx6.clearRect(0, 0, canvas6.width, canvas6.height);
    for (let i = 0; i < particlesArray6.length; i++) {
        particlesArray6[i].draw();
        particlesArray6[i].update();
    }
    connect6();
    requestAnimationFrame(animate6);
}

animate6();

function connect6() {
    let opacityValue6 = 1;
    for (let a = 0; a < particlesArray6.length; a++) {
        for (let b = a; b < particlesArray6.length; b++) {
            let dx = particlesArray6[a].x - particlesArray6[b].x;
            let dy= particlesArray6[a].y - particlesArray6[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 26) {
                opacityValue6 = 1 - (distance/26);
                ctx6.strokeStyle = 'rgba(255, 255, 255,' + opacityValue6 + ')';
                ctx6.lineWidth = 6;
                ctx6.beginPath();
                ctx6.moveTo(particlesArray6[a].x, particlesArray6[a].y);
                ctx6.lineTo(particlesArray6[b].x, particlesArray6[b].y);
                ctx6.stroke();

            }
        }
    }
}



//camvas7
const canvas7 = document.getElementById('canvas7');
const container7 = document.getElementById('container7');
const ctx7 = canvas7.getContext('2d');
const particlesArray7 = [];
ctx7.lineWidth = 3;

canvas7.width = container7.offsetWidth;
canvas7.height = container7.offsetHeight;

const mouse7 = {
    x: null,
    y: null,
    radius: 70
}

canvas7.addEventListener('mousemove', function(event) {
    mouse7.x = event.x - canvas7.getBoundingClientRect().left;
    mouse7.y = event.y - canvas7.getBoundingClientRect().top;
})

ctx7.fillStyle = '#dfd5c5';
ctx7.font = '16px Verdana';
ctx7.fillText('Moon', 3.5, 20);

const textCoordinates7 = ctx7.getImageData(0, 0, canvas7.width, canvas7.height);

class Particle7 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 5) + 0.5;
        this.distance;
    }
    draw(){
        ctx7.fillStyle = 'rgba(0, 187, 240, 0.7)';
        ctx7.lineWidth = 3;
        ctx7.strokeStyle = 'rgba(66, 184, 131, 1)';
        ctx7.beginPath();

        if ( this.distance < mouse7.radius - 5) {
            this.size = 13;
            ctx7.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx7.strokeStyle = 'rgba(255, 255, 130, 1)';
            ctx7.rect(this.x, this.y, this.size * 2, this.size * 2);
            ctx7.stroke();
            ctx7.beginPath();
            //ctx7.arc(this.x - 10, this.y - 10, this.size/1.5, 0, Math.PI * 2);
        } else if ( this.distance <= mouse5.radius) {
            this.size = 25;
            ctx7.fillStyle = 'rgba(253, 163, 3, 0.7)';
            ctx7.strokeStyle = 'rgba(253, 163, 3, 1)';
            ctx7.rect(this.x, this.y, this.size, this.size);
            ctx7.stroke();
            ctx7.beginPath();
            ctx7.arc(this.x + 13, this.y + 13, this.size/5, 0, Math.PI * 2);
        } else {
            this.size = 8;
            ctx7.rect(this.x, this.y, this.size * 1.5, this.size * 1.5);
            ctx7.stroke();
            ctx7.beginPath();
            ctx7.arc(this.x + 6, this.y + 6, this.size/2.5, 0, Math.PI * 2);
        }
        
        ctx7.closePath();
        ctx7.fill();
    }
    update(){
        let dx = mouse7.x - this.x;
        let dy = mouse7.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.distance = distance;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse7.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse7.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if ( this.x !== this.baseX ){
                let dx = this.x - this.baseX;
                this.x -= dx/40;
            } 
            if ( this.y !== this.baseY ){
                let dy = this.y - this.baseY;
                this.y -= dy/40;
            } 
        }
    }
}

function init7() {
    for (let y = 0, y2 = textCoordinates7.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates7.width; x < x2; x++) {
           if (textCoordinates7.data[(y * 4 * textCoordinates7.width) + (x * 4)] > 128) {
              let positionX = x;
              let positionY = y;
              particlesArray7.push(new Particle7(positionX * 10, positionY * 10));
           }
        }
    }
}

init7();

function animate7() {
    ctx7.clearRect(0, 0, canvas7.width, canvas7.height);
    for (let i = 0; i < particlesArray7.length; i++) {
        particlesArray7[i].draw();
        particlesArray7[i].update();
    }
    requestAnimationFrame(animate7);
}

animate7();


//camvas8
const canvas8 = document.getElementById('canvas8');
const container8 = document.getElementById('container8');
const ctx8 = canvas8.getContext('2d');
const particlesArray8 = [];
ctx8.lineWidth = 3;

canvas8.width = container8.offsetWidth;
canvas8.height = container8.offsetHeight;

const mouse8 = {
    x: null,
    y: null,
    radius: 80
}

canvas8.addEventListener('mousemove', function(event) {
    mouse8.x = event.x - canvas8.getBoundingClientRect().left;
    mouse8.y = event.y - canvas8.getBoundingClientRect().top;
})

ctx8.fillStyle = '#dfd5c5';
ctx8.font = '15px Verdana';
ctx8.fillText('LIFE', 19, 14);
ctx8.fillText('IS', 27, 28);
ctx8.fillText('GOOD', 13, 42);

const textCoordinates8 = ctx8.getImageData(0, 0, canvas8.width, canvas8.height);

class Particle8 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 5) + 0.5;
        this.distance;
    }
    draw(){
        ctx8.lineWidth = 2;
        ctx8.strokeStyle = 'rgba(253, 233,148, 1)';
        ctx8.beginPath();

        if ( this.distance < mouse8.radius - 5) {
            this.size = 5;
            ctx8.strokeStyle = 'rgba(255, 182, 119, 1)';
            ctx8.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx8.stroke();
            ctx8.beginPath();
        } else if ( this.distance <= mouse5.radius) {
            this.size = 3;
            ctx8.strokeStyle = 'rgba(255, 255, 255, 1)';
            ctx8.rect(this.x, this.y, this.size, this.size);
            ctx8.stroke();
            ctx8.beginPath();
        } else {
            this.size = 2;
            ctx8.arc(this.x + 6, this.y + 6, this.size, 0, Math.PI * 2);
            ctx8.stroke();
            ctx8.beginPath();
        }
        
        ctx8.closePath();
        ctx8.fill();
    }
    update(){
        let dx = mouse8.x - this.x;
        let dy = mouse8.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.distance = distance;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse8.radius * 2;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse8.radius) {
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

function init8() {
    for (let y = 0, y2 = textCoordinates8.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates8.width; x < x2; x++) {
           if (textCoordinates8.data[(y * 4 * textCoordinates8.width) + (x * 4)] > 128) {
              let positionX = x;
              let positionY = y;
              particlesArray8.push(new Particle8(positionX * 7, positionY * 7));
           }
        }
    }
}

init8();

function animate8() {
    ctx8.clearRect(0, 0, canvas8.width, canvas8.height);
    for (let i = 0; i < particlesArray8.length; i++) {
        particlesArray8[i].draw();
        particlesArray8[i].update();
    }
    requestAnimationFrame(animate8);
}

animate8();

//camvas9
const canvas9 = document.getElementById('canvas9');
const container9 = document.getElementById('container9');
const ctx9 = canvas9.getContext('2d');
const particlesArray9 = [];
ctx9.lineWidth = 3;

canvas9.width = container9.offsetWidth;
canvas9.height = container9.offsetHeight;

const mouse9 = {
    x: null,
    y: null,
    radius: 50
}

canvas9.addEventListener('mousemove', function(event) {
    mouse9.x = event.x - canvas9.getBoundingClientRect().left;
    mouse9.y = event.y - canvas9.getBoundingClientRect().top;
})

ctx9.fillStyle = '#dfd5c5';
ctx9.font = '20px Times New Roman';
ctx9.fillText('????', 8, 20);


const textCoordinates9 = ctx9.getImageData(0, 0, canvas9.width, canvas9.height);

class Particle9 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 5) + 0.5;
        this.distance;
    }
    draw(){
        ctx9.fillStyle = '#ff0000';
        ctx9.beginPath();

        if ( this.distance < mouse9.radius - 5) {
            this.size = 2;
            ctx9.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx9.fill();
            ctx9.beginPath();
        } else if ( this.distance <= mouse5.radius) {
            this.size = 3;
            ctx9.rect(this.x, this.y, this.size, this.size);
            ctx9.fill();
            ctx9.beginPath();
        } else {
            this.size = 5;
            ctx9.arc(this.x + 6, this.y + 6, this.size, 0, Math.PI * 2);
            ctx9.fill();
            ctx9.beginPath();
        }
        
        ctx9.closePath();
        ctx9.fill();
    }
    update(){
        let dx = mouse9.x - this.x;
        let dy = mouse9.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.distance = distance;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse9.radius * 2;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse9.radius) {
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

function init9() {
    for (let y = 0, y2 = textCoordinates9.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates9.width; x < x2; x++) {
           if (textCoordinates9.data[(y * 4 * textCoordinates9.width) + (x * 4)] > 129) {
              let positionX = x;
              let positionY = y;
              particlesArray9.push(new Particle9(positionX * 12, positionY * 12));
           }
        }
    }
}

init9();

function animate9() {
    ctx9.clearRect(0, 0, canvas9.width, canvas9.height);
    for (let i = 0; i < particlesArray9.length; i++) {
        particlesArray9[i].draw();
        particlesArray9[i].update();
    }
    connect9();
    requestAnimationFrame(animate9);
}

animate9();

function connect9() {
    let opacityValue9 = 1;
    for (let a = 0; a < particlesArray9.length; a++) {
        for (let b = a; b < particlesArray9.length; b++) {
            let dx = particlesArray9[a].x - particlesArray9[b].x;
            let dy= particlesArray9[a].y - particlesArray9[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 20) {
                opacityValue9 = 1 - (distance/20);
                ctx9.strokeStyle = 'rgba(255, 0, 0,' + opacityValue9 + ')';
                ctx9.lineWidth = 4;
                ctx9.beginPath();
                ctx9.moveTo(particlesArray9[a].x, particlesArray9[a].y);
                ctx9.lineTo(particlesArray9[b].x, particlesArray9[b].y);
                ctx9.stroke();

            }
        }
    }
}
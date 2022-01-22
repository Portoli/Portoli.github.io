import * as THREE from "../build/three.module.js";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";
import Object_ButtonLineMesh from "./Module-DecoButton.js";
$(document).ready(function () {
  setTimeout(function () {
    $("#loadScreen").css("opacity", "0");
  }, 1000);
  setTimeout(function () {
    $("#loadScreen").css("display", "none");
  }, 1700);
});
var c = document.getElementById("bg");
c.height = window.innerHeight;
c.width = window.innerWidth;
var ctx = c.getContext("2d");

var image1 = new Image();
image1.src = "img/photo/Marker2.png";
image1.onload = function () {
  ctx.drawImage(
    image1,
    img2Width * 0.97,
    c.height * 0.08,
    c.width * 0.31,
    c.height * 0.92
  );
};

var image2 = new Image();
var img2Width = Math.floor(c.width * 0.698);
var img2Height = c.height;
image2.src = "img/photo/MarkerPath-Full.png";
let mappedImage = [];
image2.onload = function () {
  ctx.drawImage(image2, 0, 0, img2Width, img2Height);
  const pixels2 = ctx.getImageData(0, 0, img2Width, img2Height);

  for (let y = 0; y < 1200; y++) {
    let row = [];
    for (let x = 0; x < img2Width; x++) {
      const red = pixels2.data[4 * y * pixels2.width + x * 4];
      row.push(red);
    }
    mappedImage.push(row);
  }
};

const mouse = {
  x: 1300,
  y: 0,
  radius: c.height * 0.17,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  for (let i = 1; i < particleArray.length; i++) {
    particleArray[i].updateSize();
  }
  img2Width = Math.floor(c.width * 0.698);
  img2Height = c.height;
  mouse.radius = c.height * 0.17;
  particleArray[0].x = img2Width;
  particleArray[0].y = img2Height * 0.453;
  particleArray[0].baseX = img2Width;
  particleArray[0].baseY = img2Height * 0.453;
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 2;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 5;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX * 2;
      this.y -= directionY * 2;
    } else {
      if (this.x !== this.beseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 50;
      }
      if (this.y !== this.beseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 50;
      }
    }
  }
  updateSize() {
    let newX = (this.baseX / img2Width) * Math.floor(c.width * 0.698);
    let newY = (this.baseY / img2Height) * c.height;
    this.baseX = newX;
    this.baseY = newY;
  }
}
let particleArray;
function init() {
  particleArray = [];
  particleArray.push(new Particle(img2Width, img2Height * 0.453));
  for (let i = 0; i < 400; i++) {
    let x = Math.floor(Math.pow(Math.random(), 1 / 2) * img2Width);
    let y = Math.floor(Math.random() * 1200);
    if (x > img2Width * 0.65) {
      let yMulti = Math.sqrt(
        (x - img2Height * 0.55) / (img2Width - img2Height / 2)
      );
      let cDis = (img2Height / 2 - y) / yMulti;
      y += cDis;
    }
    if (x > 1250) {
      let yMulti = (x - img2Height) / (img2Width - img2Height);
      let cDis = (-img2Height / 30) * yMulti;
      y += cDis;
    }
    x = Math.floor(x);
    y = Math.floor(y);

    if (x > img2Width || x < 0 || y > img2Height || y < 0) continue;
    if (mappedImage[y][x] < 11) continue;
    particleArray.push(new Particle(x, y));
  }
}

function connect() {
  let opacityValue = 1;
  let maxLen;
  for (let i = 0; i < particleArray.length; i++) {
    for (let j = i + 1; j < particleArray.length; j++) {
      maxLen =
        Math.pow(1 - particleArray[i].x / img2Width, 2) * c.height * 0.4 +
        c.height * 0.07;
      if (i == 0) maxLen = 100;
      let disX = particleArray[i].x - particleArray[j].x;
      let disY = particleArray[i].y - particleArray[j].y;
      let disLenght = Math.sqrt(disX * disX + disY * disY);

      if (disLenght < maxLen) {
        opacityValue = 1 - disLenght / maxLen;
        ctx.strokeStyle = "rgb(255, 255, 255, " + opacityValue + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, c.width, c.height);
  //ctx.drawImage(image2, 0, 0, img2Width, img2Height);
  for (let i = 1; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }

  ctx.drawImage(
    image1,
    img2Width * 0.97,
    c.height * 0.08,
    c.width * 0.31,
    c.height * 0.92
  );
  connect();

  requestAnimationFrame(animate);
}
setTimeout(function () {
  init();
  animate();
}, 1000);

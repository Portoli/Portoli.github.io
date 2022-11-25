
let flowFieldAnimation;
$(document).ready(function () {
  setTimeout(function () {
    $("#loadScreen").css("opacity", "0");
  }, 1000);
  setTimeout(function () {
    $("#loadScreen").css("display", "none");
  }, 1700);

  let flowField = new FlowFieldEffect(ctx, c.width, c.height);
  flowField.animate();

  $(window).on("resize", function () {
    let saveCenterRemove = flowField.centerRemove;
    let saveCenterSlide = flowField.centerSlide;
    cancelAnimationFrame(flowFieldAnimation);
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, c.width, c.height);
    flowField.animate();
    flowField.centerRemove = saveCenterRemove;
    flowField.centerSlide = saveCenterSlide;

    mouse.radius = Math.floor(c.height / 5);
    this.circle1R = Math.floor(c.height / 4);
    if (c.height > c.width) {
      mouse.radius = Math.floor(c.width / 5);
      this.circle1R = Math.floor(c.width / 4);
    }
  });

  $("#buttonCenterRemove").on("click", function () {
    flowField.centerRemove = 1;
    $("#buttonCenterRemove").css("opacity", "0");
    $("#imgHere").css("opacity", "0");
    setTimeout(function () {
      $("#buttonCenterRemove").css("display", "none");
      $("#imgHere2").css("opacity", "0");
    }, 700);
  });
});
var c = document.getElementById("bg");
c.height = window.innerHeight;
c.width = window.innerWidth;
var ctx = c.getContext("2d");

const mouse = {
  x: 0,
  y: 0,
  radius: Math.floor(c.height / 5),
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
var pFaze = new Array(400);
for (var i = 0; i < 400; i++) {
  pFaze[i] = new Array(300).fill(0);
}
var pFaze2 = new Array(400);
for (var i = 0; i < 400; i++) {
  pFaze2[i] = new Array(300).fill(0);
}

function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

class FlowFieldEffect {
  #ctx;
  #width;
  #height;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#ctx.strokeStyle = "white";
    this.#width = width;
    this.#height = height;
    //this.angle = 0;
    this.timePast = 0;
    this.interval = 1000 / 60;
    this.timer = 0;
    this.cellSize = 15;

    this.#ctx.strokeStyle = this.gradient;
    this.circle1Pos = [this.#width * 0.5, this.#height * 0.4];
    this.circle1R = Math.floor(c.height / 4);
    this.circle1A = 0;
  }
  circleMove() {
    this.circle1Pos[0] =
      this.#width * 0.5 + this.#width * 0.13 * Math.cos(this.circle1A);
    this.circle1Pos[1] =
      this.#height * 0.4 + this.#height * 0.1 * Math.sin(this.circle1A);
    this.circle1A += 0.03;
  }
  circleSpace(x, y) {
    let multiL;
    let startX = this.circle1Pos[0] - x;
    let startY = this.circle1Pos[1] - y;

    let startL = Math.sqrt(startX * startX + startY * startY);
    let startA = Math.atan2(startY, startX);

    let endL = 2;
    if (startL < this.circle1R) {
      multiL = 100 - Math.floor((startL / this.circle1R) * 100);

      if (pFaze2[x / this.cellSize][y / this.cellSize] < multiL) {
        pFaze2[x / this.cellSize][y / this.cellSize] += 5;
        //console.log(1);

        pFaze[x / this.cellSize][y / this.cellSize] =
          pFaze2[x / this.cellSize][y / this.cellSize];
      }
    } else {
      if (pFaze2[x / this.cellSize][y / this.cellSize] > 0) {
        pFaze2[x / this.cellSize][y / this.cellSize]--;

        pFaze[x / this.cellSize][y / this.cellSize] =
          pFaze2[x / this.cellSize][y / this.cellSize];
      }
    }
  }
  #drawLine(x, y) {
    //const length = 300;
    this.#ctx.lineWidth = 1;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    let multiL;

    let startX = mouse.x - x;
    let startY = mouse.y - y;

    let startL = Math.sqrt(startX * startX + startY * startY);
    let startA = Math.atan2(startY, startX);

    let endA = startA;
    let endL = 2;

    //mouse circle test
    if (startL < mouse.radius) {
      multiL = 100 - Math.floor((startL / mouse.radius) * 100);

      endA += ((3.14 / 2) * multiL) / 100;
      if (pFaze[x / this.cellSize][y / this.cellSize] < multiL) {
        pFaze[x / this.cellSize][y / this.cellSize] += 5;
      }
    } else {
      if (pFaze[x / this.cellSize][y / this.cellSize] > 0) {
        pFaze[x / this.cellSize][y / this.cellSize]--;
      }
    }

    //circle1 test
    if (x > this.#width * 0.2 && x < this.#width * 0.8) {
      this.circleSpace(x, y);
    }

    endL = 0 + (pFaze[x / this.cellSize][y / this.cellSize] * 32) / 100;
    this.#ctx.lineWidth =
      1 + (pFaze[x / this.cellSize][y / this.cellSize] * 30) / 100;

    let endX = Math.cos(endA) * endL * 2;
    let endY = Math.sin(endA) * endL * 2;
    let lineEndX = x + endX;
    let lineEndY = y + endY;

    this.#ctx.lineTo(lineEndX, lineEndY);
    this.#ctx.stroke();
  }
  animate(timeNow = 0) {
    const timeDif = timeNow - this.timePast;
    this.timePast = timeNow;
    if (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      for (let y = 0; y < this.#height; y += this.cellSize) {
        for (let x = 0; x < this.#width; x += this.cellSize) {
          this.#drawLine(x, y);
        }
      }
      this.timer = 0;
    } else {
      this.timer += timeDif;
    }
    this.circleMove();
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
  }
}

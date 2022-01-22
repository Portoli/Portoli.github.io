//var c = document.getElementById("canvas1");
//var ctx = c.getContext("2d");
export default class Object_ButtonLineMesh {
  constructor(ctx, cX, cY, cRadius, pCount, pSize, maxL, maxC) {
    this.ctx = ctx;
    this.cX = cX;
    this.cY = cY;
    this.cRadius = cRadius;
    this.eCRadius = [];
    this.pCount = pCount;
    this.pSize = pSize;
    this.maxL = maxL;
    this.maxC = maxC;

    this.hideShift = 100;
    this.hiding = true;
    this.lineColor = "rgb(250,250,250,";
    this.pPositions = [];
    this.alpha = (Math.PI * 2) / pCount;
    this.shift = [];
    this.shiftStep = [];
    this.shiftSet();
  }

  Draw(i) {
    this.ctx.beginPath();
    this.ctx.arc(
      this.pPositions[i][0],
      this.pPositions[i][1],
      this.pSize,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = this.lineColor + "1)";
    this.ctx.fill();
  }

  shiftSet() {
    for (let i = 0; i < this.pCount; i++) {
      this.shift[i] = (Math.floor(Math.random() * 100) / 100) * 6.28;
    }
    for (let i = 0; i < this.pCount; i++) {
      this.shiftStep[i] = Math.floor(Math.random() * 100) / 2000;
    }
  }

  positionSet() {
    for (let i = 0; i < this.pCount; i++) {
      this.pPositions[i] = [
        this.eCRadius[i] * Math.cos(i * this.alpha) + this.cX,
        this.eCRadius[i] * Math.sin(i * this.alpha) + this.cY,
      ];
      this.Draw(i);
    }
  }

  animate() {
    for (let i = 0; i < this.pCount; i++) {
      this.eCRadius[i] =
        this.cRadius + this.cRadius * 0.1 * Math.sin(this.shift[i]);
      if (this.hideShift)
        this.eCRadius[i] = (this.eCRadius[i] * this.hideShift) / 100;
      this.shift[i] += this.shiftStep[i];
    }
    this.positionSet();
    this.pLinesCheck();

    if (!this.hiding && this.hideShift < 100) {
      this.hideShift += 15;
    } else if (this.hiding && this.hideShift > 40) {
      this.hideShift -= 15;
    }
  }

  pLinesCheck() {
    let opacityValue = 1;
    for (let i = 0; i < this.pCount; i++) {
      for (let j = i + 1; j <= i + this.maxC; j++) {
        let disX = this.pPositions[i][0] - this.pPositions[j % this.pCount][0];
        let disY = this.pPositions[i][1] - this.pPositions[j % this.pCount][1];
        let disLenght = Math.sqrt(disX * disX + disY * disY);

        if (disLenght < this.maxL) {
          opacityValue = 1 - disLenght / this.maxL;
          this.ctx.strokeStyle = this.lineColor + opacityValue + ")";
          this.ctx.lineWidth = 3;
          this.ctx.beginPath();
          this.ctx.moveTo(this.pPositions[i][0], this.pPositions[i][1]);
          this.ctx.lineTo(
            this.pPositions[j % this.pCount][0],
            this.pPositions[j % this.pCount][1]
          );
          this.ctx.stroke();
        }
      }
    }
  }
}

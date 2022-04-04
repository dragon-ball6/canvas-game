let setup = () => {
  createCanvas(500, 500);
};

// key pressed
let keyP = {};

let world = { x: 1000, y: 1000 };

class Player {
  constructor() {
    this.x = world.x/2;
    this.y = world.y/2;
    this.size = 30;
    this.spd = 5;
  }
  display() {
    fill(0xFFDBAC);
    ellipse(this.x, this.y, this.size, this.size);
  }
  update() {
    let spd = constrain(this.spd, this.size/2, this.world-this.size/2);

    if (keyP.a) this.x -= spd;
    if (keyP.d) this.x += spd;
    if (keyP.w) this.y -= spd;
    if (keyP.s) this.y += spd;
  }
}

let you = new Player();

let draw = () => {
  background(255);
  you.display();
  you.update();
};

let keyPressed = () => {
  keyP[String(key).toLowerCase()] = true;
  return false;
};
let keyReleased = () => {
  delete keyP[String(key).toLowerCase()];
  return false;
};

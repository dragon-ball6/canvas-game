let setup = () => {
  createCanvas(500, 500);
};

let world = { x: 1000, y: 1000 };

class Player {
  constructor() {
    this.x = world.x/2;
    this.y = world.y/2;
    this.size = 30;
  }
  display() {
    ellipse(this.x, this.y, this.size, this.size);
  }
  update() {
    
  }
}

let draw = () => {
  background(255);

};

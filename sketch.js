function setup() {
  createCanvas(500, 500);
};

// key pressed
let keyP = {};

let world = { x: 1000, y: 1000 };

let resources = {
  wood: 0,
  stone: 0,
  gold: 0,
  iron: 0,
  gem: 0,
  fur: 0,
  food: 0
};

let level;

// some sugar to remove our attention from the prevailing truth =]
class Player {
  constructor() {
    this.x = world.x/2;
    this.y = world.y/2;
    this.size = 30;
    this.spd = 5;
  }
  display() {
    fill(unhex("FFDBAC"));
    ellipse(width/2, height/2, this.size, this.size);
  }
  update() {
    if (keyP.a) this.x = constrain(this.x - this.spd, this.size/2, this.world-this.size/2);
    if (keyP.d) this.x = constrain(this.x + this.spd, this.size/2, this.world-this.size/2);
    if (keyP.w) this.y = constrain(this.y - this.spd, this.size/2, this.world-this.size/2);
    if (keyP.s) this.y = constrain(this.y + this.spd, this.size/2, this.world-this.size/2);
  }
}

// more sugar
class Generator {
  constructor(x, y, type, health) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.health = health;
  }
  mine() {
    this.health--;
    switch (level) {
      case "wood":
        resources[this.type.toLowerCase()]++;
      break;
      case "stone":
        resources[this.type.toLowerCase()] += 3;
      break;
      case "iron":
        resources[this.type.toLowerCase()] += 6;
      default:
        // ouch fists
        resources[this.type.toLowerCase()] += 0.5;
    }
  }
}


// even more sugar, with added inheritance =]
class Tree extends Generator {
  constructor(x, y) {
    super(x, y, "Wood", 3);
  }
}
class Boulder extends Generator {
  constructor(x, y) {
    super(x, y, "Stone", 25);
  }
}
class Rock extends Generator {
  constructor(x, y) {
    super(x, y, "Stone", 10);
  }
}
class Pebble extends Generator {
  constructor(x, y) {
    super(x, y, "Stone", 3);
  }
}
class Gold extends Generator {
  constructor(x, y) {
    super(x, y, "Gold", 15);
  }
}
class Iore extends Generator {
  constructor(x, y) {
    super(x, y, "Iron", 20)
  }
}
class Gem extends Generator {
  constructor(x, y) {
    super(x, y, "Gem", 30);
  }
}

let you = new Player();

function draw() {
  // try-catch: MY PRECIOUS
  try {
    background(255);
    you.display();
    you.update();
  } catch (e) {
    console.error(`The DEVELOPER made a mistake!!! ${e.message} at ${e.line}`);
    console.info("If you are not the DEVELOPER, create an issue here: https://github.com/dragon-ball6/canvas-game/issues")
  }
}

function keyPressed() {
  keyP[String(key).toLowerCase()] = true;
  return false;
}
function keyReleased() {
  delete keyP[String(key).toLowerCase()];
  return false;
}

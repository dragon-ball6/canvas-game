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
    fill("#FFDBAC");
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
class Source {
  constructor(x, y, type, health, colour) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.health = health;
    this.colour = colour;
  }
  display() {
    fill(colour);
    ellipse(this.x, this.y, this.health*5, this.health*5);
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
      break;
      case "gold":
        // NOTE: make it downgrade your tool when destroyed
        resources[this.type.toLowerCase()] += 14;
      break;
      default:
        // ouch fists
        resources[this.type.toLowerCase()] += 0.5;
    }
  }
}


// even more sugar, with added inheritance =]
class Tree extends Source {
  constructor(x, y) {
    super(x, y, "Wood", 3);
  }
}
class Boulder extends Source {
  constructor(x, y) {
    super(x, y, "Stone", 25);
  }
}
class Rock extends Source {
  constructor(x, y) {
    super(x, y, "Stone", 10);
  }
}
class Pebble extends Source {
  constructor(x, y) {
    super(x, y, "Stone", 3);
  }
}
class Gold extends Source {
  constructor(x, y) {
    super(x, y, "Gold", 15);
  }
}
class Iore extends Source {
  constructor(x, y) {
    super(x, y, "Iron", 20)
  }
}
class Gem extends Source {
  constructor(x, y) {
    super(x, y, "Gem", 30);
  }
}

let you = new Player();
let cam = {x: you.x, y: you.y};

// resource sources (see 'class Source' or above)
let objs = [];
for (var i = 0; i <= world/50; i++) {
  objs.push(random([Tree, Boulder, Rock, Pebble, Gold, Iore]));
}

let logged = false;

function draw() {
  // try-catch: MY PRECIOUS
  try {
    background(255);
    you.display();
    you.update();

    push();
    translate(cam.x, cam.y);
    for (let i of objs) {
      i.display();
    }
    pop();
    cam = {x: you.x, y: you.y};
  } catch (e) {
    let err = `The DEVELOPER made a mistake!!! ${e.message}`;
    if (logged !== err) console.error(err); logged = err;
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

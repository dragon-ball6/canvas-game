// try-catch: MY PRECIOUS
let logged;
try {
function setup() {
  // to maximise the screen
  createCanvas(window.innerWidth, window.innerHeight);

  // there should be stroke
  stroke(0);
};

// adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function rand(arr) {
  if (typeof arr === Array) {
    min = Math.ceil(0);
    max = Math.floor(arr.length-1);
    return arr[Math.floor(Math.random() * (max - min + 1) + min)];
  } else {
    if (arguments.length === 1) {
      min = Math.ceil(0);
      max = Math.floor(arr);
      return Math.floor(Math.random() * (max - min + 1) + min);
    } else if (arguments.length === 2) {
      min = Math.ceil(arguments[0]);
      max = Math.floor(arguments[2]);
      return Math.floor(Math.random() * (max - min + 1) + min);
    } else {
      throw 'Wrong number of arguments!';
    }
  }
}

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
    if (keyP.a) {this.x = constrain(this.x - this.spd, this.size/2, this.world-this.size/2);}
    if (keyP.d) {this.x = constrain(this.x + this.spd, this.size/2, this.world-this.size/2);}
    if (keyP.w) {this.y = constrain(this.y - this.spd, this.size/2, this.world-this.size/2);}
    if (keyP.s) {this.y = constrain(this.y + this.spd, this.size/2, this.world-this.size/2);}
  }
}

// more sugar
class Source {
  constructor(x, y, type, health, colour) {
    this.x = x;
    this.y = y;
    this.type = type;

    // how much hits needed to break
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
    super(x, y, "Wood", 3, "#682c2c");
  }
}
class Boulder extends Source {
  constructor(x, y) {
    super(x, y, "Stone", 25, "#c2c2c2");
  }
}
class Rock extends Source {
  constructor(x, y) {
    super(x, y, "Stone", 10, "#c2c2c2");
  }
}
class Pebble extends Source {
  constructor(x, y) {
    super(x, y, "Stone", 3, "#c2c2c2");
  }
}
class Gold extends Source {
  constructor(x, y) {
    super(x, y, "Gold", 15, "ffdd00");
  }
}
class Iore extends Source {
  constructor(x, y) {
    super(x, y, "Iron", 20, "#d4d4d4")
  }
}
class Gem extends Source {
  constructor(x, y) {
    super(x, y, "Gem", 30, "#00fbff");
  }
}

let you = new Player();
let cam = {x: you.x, y: you.y};

// resource sources (see 'class Source' or above)
let objs = [];
for (var i = 0; i <= (world.x, world.y)/50; i++) {
  objs.push(new rand([Tree, Boulder, Rock, Pebble, Gold, Iore, Gem]).constructor(rand(world.x), rand(world.y)));
}


function draw() {
  background(255);
  you.display();
  you.update();

  push();
  translate(cam.x, cam.y);
  for (let i = objs.length; i--;) {
    objs[i].display();
  }
  pop();
  cam = {x: you.x, y: you.y};
}

function keyPressed() {
  keyP[String(key).toLowerCase()] = true;
  return false;
}
function keyReleased() {
  delete keyP[String(key).toLowerCase()];
  return false;
}
} catch (e) {
  let err = `The DEVELOPER made a mistake!!! ${e.message}`;
  if (logged !== err) console.error(err); logged = err;
}

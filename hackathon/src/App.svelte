<script>
  import P5 from "p5-svelte";
  import { applyGravity, inBounds, collides } from "./utils.js";

  const WIDTH = 400;
  const HEIGHT = 200;
  let img;
  const sketch = (p5) => {
    p5.preload = () => {
      img = p5.loadImage("public/monkey.png");
    };
    p5.setup = () => {
      setup(p5);
      setTimeout(() => {
        can_die = true;
      }, 1250);
    };

    p5.draw = () => {
      draw(p5);
    };

    p5.keyPressed = () => {
      console.log(p5.keyCode);
      const kc = p5.keyCode;
      monkey.handleMove(kc);
    };
  };
  let lost = false;
  let can_die = false;

  var blobs = [];
  let bg;
  const setup = (p5) => {
    console.log(bg);
    // bg = p5.loadImage("./bananabground.jpg");
    p5.createCanvas(WIDTH, HEIGHT);
    class Blob {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        let angle = p5.random(0, 2 * 3.14159265358979323);
        this.xspeed = p5.random(2, 5) * Math.cos(angle);
        this.yspeed = p5.random(2, 5) * Math.sin(angle);
        this.r = p5.random(20, 55);
      }

      update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        if (this.x > WIDTH || this.x < 0) this.xspeed *= -1;
        if (this.y > HEIGHT || this.y < 0) this.yspeed *= -1;
      }

      show() {
        p5.fill("red");
        p5.stroke(0);
        p5.strokeWeight(4);
        p5.ellipse(this.x, this.y, this.r * 2, this.r * 2);
      }
    }
    for (let i = 0; i < 10; i++)
      blobs.push(new Blob(p5.random(0, WIDTH), p5.random(0, HEIGHT)));
    p5.frameRate(100);
  };

  const draw = (p5) => {
    p5.background("green");
    // update all objects
    objects.forEach((obj) => {
      obj.update();
      obj.render(p5);
      // applyGravity(obj);
    });
    p5.ellipse(p5.mouseX, p5.mouseY, 15, 15);
    p5.image(img, p5.mouseX - 7, p5.mouseY - 7, 15, 15);
    p5.loadPixels();
    p5.textSize(128);
    for (let i = 0; i < blobs.length; ++i) {
      if (
        can_die &&
        collides(
          { x: p5.mouseX, y: p5.mouseY, r: 12 },
          { x: blobs[i].x, y: blobs[i].y, r: blobs[i].r }
        )
      ) {
        p5.text("AYO YOU LOST ", 10, 10, 70, 80);
        lost = true;
        p5.noLoop();
      }
    }
    for (let x = 0; x < WIDTH; x += 1) {
      for (let y = 0; y < HEIGHT; y += 1) {
        let sum = 0;
        for (let i = 0; i < blobs.length; i++) {
          let xdif = x - blobs[i].x;
          let ydif = y - blobs[i].y;
          let d = p5.sqrt(xdif * xdif + ydif * ydif);
          sum += (100 * blobs[i].r) / d;
        }
        if (sum > 300) p5.set(x, y, p5.color(0, sum / 2, 255));
      }
    }
    p5.updatePixels();

    for (let i = 0; i < blobs.length; i++) {
      blobs[i].update();
    }
  };

  // objects
  const objects = [];

  // monkey
  // const monkey = {
  //   x: WIDTH / 2,
  //   y: HEIGHT - 100,
  //   vx: 0,
  //   vy: 0,
  //   r: 40,
  //   static: false,
  // };

  // monkey.render = (p5) => {
  //   p5.ellipse(monkey.x, monkey.y, monkey.r, monkey.r);
  // };

  // monkey.update = () => {
  //   monkey.x += monkey.vx;
  //   monkey.y += monkey.vy;
  // };

  // monkey.handleMove = (kc) => {
  //   if (kc == 38) {
  //     monkey.vy = -1;
  //   } else if (kc == 40) {
  //     monkey.vy = 1;
  //     // down
  //   } else if (kc == 39) {
  //     monkey.vx = 1;
  //     // right
  //   } else if (kc == 37) {
  //     monkey.vx = -1;
  //     // left
  //   }
  // };

  // objects.push(monkey);
</script>

<main>
  {#if lost}
    <h1>YOU LOST</h1>
  {/if}
  <P5 {sketch} />
</main>

<style>
  main {
    max-height: 90vh;
  }

  :global(.p5Canvas) {
    background-color: red;
    border: 2px solid red;
  }
</style>

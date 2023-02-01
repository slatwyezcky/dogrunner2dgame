import Player from "./assets/modules/player.js";
import InputHandler from "./assets/modules/inputHandler.js";
import { Background } from "./assets/modules/background.js";
import {
  Plant,
  Fly,
  Bat,
  Ghost,
  Zombie,
  GroundZombie,
  BigSpider,
  SmallSpider,
} from "./assets/modules/enemies.js";
import { UI } from "./assets/modules/UI.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 20;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.time = 30000;
      this.lives = 5;
      this.gameStart = true;
      this.gameOver = false;
      this.gameOverScreenOpacity = 0;
      this.score = 0;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      this.fontColor = "black";
    }

    update(deltaTime) {
      if (!this.gameStart) this.time -= deltaTime;
      if (this.time <= 0) {
        this.gameOver = true;
        this.time = 0;
      }
      if (this.gameOver && this.gameOverScreenOpacity < 1)
        this.gameOverScreenOpacity += 0.02;
      else if (this.gameOver && this.gameOverScreenOpacity >= 1) {
        this.gameOverScreenOpacity = 1;
      }
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // handle enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.enemyTimer = 0;
        this.addEnemy();
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion)
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });
      // handle particles
      this.particles.forEach((particle) => {
        particle.update();
        if (particle.markedForDeletion)
          this.particles.splice(this.particles.indexOf(particle), 1);
      });
      // handle collision sprites
      this.collisions.forEach((collision) => {
        collision.update(deltaTime);
        if (collision.markedForDeletion)
          this.collisions.splice(this.collisions.indexOf(collision), 1);
      });
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => enemy.draw(context));
      this.particles.forEach((particle) => particle.draw(context));
      this.collisions.forEach((collision) => collision.draw(context));
      this.UI.draw(context);
    }

    addEnemy() {
      if (!this.gameStart) {
        let randomizer = Math.random();
        if (this.speed > 0) {
          if (randomizer < 0.25) this.enemies.push(new GroundZombie(this));
          else if (randomizer < 0.45) this.enemies.push(new Zombie(this));
          else if (randomizer < 0.75) this.enemies.push(new Plant(this));
        }
        if (this.speed > 0 && randomizer < 0.3) {
          this.enemies.push(new BigSpider(this));
        } else if (this.speed > 0 && randomizer > 0.6)
          this.enemies.push(new SmallSpider(this));

        if (randomizer < 0.3) {
          this.enemies.push(new Fly(this));
        } else if (randomizer < 0.6) this.enemies.push(new Bat(this));
        else this.enemies.push(new Ghost(this));
      }
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate(0);
});

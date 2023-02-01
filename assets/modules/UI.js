export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Creepster";
    this.liveImage = new Image();
    this.liveImage.src = "/dogrunner2dgame/assets/img/lives.png";
    this.gameOverImage = new Image();
    this.gameOverImage.src = "/dogrunner2dgame/assets/img/darksouls.png";
  }

  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "white";
    context.shadowBlur = 0;
    //Start Screen
    if (this.game.gameStart) {
      context.fillStyle = "rgba(255,255,255,0.5)";
      context.fillRect(0, 0, this.game.width, this.game.height);
      context.textAlign = "center";
      context.font = this.fontSize * 3 + "px " + this.fontFamily;
      context.fillStyle = this.game.fontColor;
      context.fillText(
        "DOG vs. MONSTERS",
        this.game.width * 0.5,
        this.game.height * 0.5
      );
      context.font = this.fontSize + "px " + this.fontFamily;
      context.fillText(
        "Kill as many monsters as you can in 30sec",
        this.game.width * 0.5,
        this.game.height * 0.5 + 50
      );
      context.font = this.fontSize * 0.6 + "px " + this.fontFamily;
      context.fillText(
        "To move use Arrows/To attack press CTRL",
        this.game.width * 0.5,
        this.game.height * 0.5 + 85
      );
      context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
      context.fillText(
        "Press ENTER to Play",
        this.game.width * 0.5,
        this.game.height * 0.5 + 200
      );
    }
    // score
    else {
      context.font = this.fontSize + "px " + this.fontFamily;
      context.textAlign = "left";
      context.fillStyle = this.game.fontColor;
      context.fillText("Score: " + this.game.score, 20, 50);
      // time
      context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
      context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);
      // lives
      for (let i = 0; i < this.game.lives; i++) {
        context.drawImage(this.liveImage, 30 * i + 20, 90, 25, 25);
      }
      // Game Over
      if (this.game.gameOver) {
        context.fillStyle =
          "rgba( 0, 0, 0, " + this.game.gameOverScreenOpacity + ")";
        context.fillRect(0, 0, this.game.width, this.game.height);
        context.drawImage(
          this.gameOverImage,
          this.game.width / 2 - 240,
          this.game.height / 2 - 38,
          480,
          76.5
        );
        context.textAlign = "center";
        context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
        context.strokeStyle = "black";
        context.lineWidth = 5;
        context.strokeText(
          "Score: " + this.game.score,
          this.game.width * 0.5,
          this.game.height * 0.5 + 100
        );
        context.fillStyle = "#781113";
        context.fillText(
          "Score: " + this.game.score,
          this.game.width * 0.5,
          this.game.height * 0.5 + 100
        );
        context.font = this.fontSize + "px " + this.fontFamily;
        context.fillText(
          "to restart press Enter",
          this.game.width * 0.5,
          this.game.height * 0.5 + 150
        );
      }
    }
    context.restore();
  }
}

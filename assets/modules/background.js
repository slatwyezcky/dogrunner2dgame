class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }

  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;

    this.layer5image = new Image();
    this.layer5image.src = "./assets/img/layer-5.png";

    this.layer4image = new Image();
    this.layer4image.src = "./assets/img/layer-4.png";

    this.layer3image = new Image();
    this.layer3image.src = "./assets/img/layer-3.png";

    this.layer2image = new Image();
    this.layer2image.src = "./assets/img/layer-2.png";

    this.layer1image = new Image();
    this.layer1image.src = "./assets/img/layer-1.png";

    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer5image
    );

    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer5image
    );

    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      this.layer4image
    );

    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.6,
      this.layer3image
    );

    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      this.layer2image
    );

    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      this.layer1image
    );

    this.backgroundLayers = [
      this.layer5,
      this.layer4,
      this.layer3,
      this.layer2,
      this.layer1,
    ];
  }

  update() {
    this.backgroundLayers.forEach((layer) => layer.update());
  }

  draw(context) {
    this.backgroundLayers.forEach((layer) => layer.draw(context));
  }
}

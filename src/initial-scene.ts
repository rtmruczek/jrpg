import data from './data/animations/girl';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

let S: Phaser.Input.Keyboard.Key;
let D: Phaser.Input.Keyboard.Key;
let A: Phaser.Input.Keyboard.Key;
let W: Phaser.Input.Keyboard.Key;
let sprite: Phaser.GameObjects.Sprite;

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.load.spritesheet('girlsheet', 'assets/girlsheet.png', {
      frameWidth: 16,
      frameHeight: 32,
    });
  }

  public create() {
    data.forEach((datum) => {
      this.anims.create({
        key: datum.key,
        frames: this.anims.generateFrameNumbers('girlsheet', {
          frames: datum.frames,
        }),
        frameRate: datum.frameRate,
        repeat: datum.repeat,
      });
    });

    sprite = this.physics.add
      .sprite(200, 200, 'spritesheet')
      .setScale(4)
      .play('facedown');
    S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }

  public update() {
    const previousVelocity = {
      x: sprite.body.velocity.x,
      y: sprite.body.velocity.y,
    };
    if (Phaser.Input.Keyboard.JustDown(S)) {
      sprite.body.velocity.y = 50;
    }
    if (Phaser.Input.Keyboard.JustUp(S)) {
      sprite.body.velocity.y = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(D)) {
      sprite.body.velocity.x = 50;
    }
    if (Phaser.Input.Keyboard.JustUp(D)) {
      sprite.body.velocity.x = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(A)) {
      sprite.body.velocity.x = -50;
    }
    if (Phaser.Input.Keyboard.JustUp(A)) {
      sprite.body.velocity.x = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(W)) {
      sprite.body.velocity.y = -50;
    }
    if (Phaser.Input.Keyboard.JustUp(W)) {
      sprite.body.velocity.y = 0;
    }

    if (sprite.body.velocity.y > 0) {
      sprite.anims.play('walkdown', true);
    }
    if (sprite.body.velocity.y < 0) {
      sprite.anims.play('walkup', true);
    }
    if (sprite.body.velocity.x > 0) {
      sprite.setFlipX(true);
      sprite.anims.play('walkleft', true);
    }
    if (sprite.body.velocity.x < 0) {
      sprite.setFlipX(false);
      sprite.anims.play('walkleft', true);
    }
    if (previousVelocity.x > 0 && sprite.body.velocity.x === 0) {
      sprite.setFlipX(true);
      sprite.anims.play('faceleft', true);
    }
    if (previousVelocity.x < 0 && sprite.body.velocity.x === 0) {
      sprite.setFlipX(false);
      sprite.anims.play('faceleft', true);
    }
    if (previousVelocity.y > 0 && sprite.body.velocity.y === 0) {
      sprite.anims.play('facedown', true);
    }
    if (previousVelocity.y < 0 && sprite.body.velocity.y === 0) {
      sprite.anims.play('faceup', true);
    }
  }
}

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
  private square: Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.Body;
  };

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

    sprite = this.add
      .sprite(200, 200, 'spritesheet')
      .setScale(4)
      .play('facedown');
    S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }

  public update() {
    if (Phaser.Input.Keyboard.JustDown(S)) {
      sprite.anims.play('walkdown');
    }
    if (Phaser.Input.Keyboard.JustUp(S)) {
      sprite.anims.play('facedown');
    }
    if (Phaser.Input.Keyboard.JustDown(D)) {
      sprite.setFlipX(true);
      sprite.anims.play('walkright');
    }
    if (Phaser.Input.Keyboard.JustUp(D)) {
      sprite.anims.play('faceright');
    }
    if (Phaser.Input.Keyboard.JustDown(A)) {
      sprite.setFlipX(false);
      sprite.anims.play('walkright');
    }
    if (Phaser.Input.Keyboard.JustUp(A)) {
      sprite.anims.play('faceright');
    }
    if (Phaser.Input.Keyboard.JustDown(W)) {
      sprite.anims.play('walkup');
    }
    if (Phaser.Input.Keyboard.JustUp(W)) {
      sprite.anims.play('faceup');
    }
  }
}

import { textChangeRangeIsUnchanged } from 'typescript';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

let key: Phaser.Input.Keyboard.Key;
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
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('girlsheet', {
        start: 0,
        end: 0,
      }),
    });
    this.anims.create({
      key: 'walkdown',
      frameRate: 6,
      frames: this.anims.generateFrameNumbers('girlsheet', {
        frames: [16, 0, 32, 0],
      }),
      repeat: -1,
    });
    sprite = this.add.sprite(200, 200, 'spritesheet').setScale(4).play('idle');
    key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  }

  public update() {
    if (Phaser.Input.Keyboard.JustDown(key)) {
      sprite.anims.play('walkdown');
    }
    if (Phaser.Input.Keyboard.JustUp(key)) {
      sprite.anims.play('idle');
    }
  }
}

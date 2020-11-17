import data from '../data/animations/girl';
import { bootstrapAnimations } from '../utils';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'overworld',
};

let sprite: Phaser.GameObjects.Sprite;
let map: Phaser.Tilemaps.Tilemap;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

const playerSpeed = 100;

export default class OverworldScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.load.spritesheet('girlsheet', 'assets/girlsheet.png', {
      frameWidth: 16,
      frameHeight: 32,
    });
    this.load.image('tiles', 'assets/watertiles-extruded.png');
    this.load.tilemapTiledJSON('worldmap', 'assets/worldmap.json');
  }

  public create() {
    map = this.make.tilemap({ key: 'worldmap' });
    const tileset = map.addTilesetImage('watertiles', 'tiles', 32, 32, 1, 2);
    map.createStaticLayer(0, tileset, 0, 0);

    cursors = this.input.keyboard.createCursorKeys();

    bootstrapAnimations(this, data, 'girlsheet');

    sprite = this.physics.add
      .sprite(2250, 2250, 'spritesheet')
      .setDebug(false, false, 0)
      .play('facedown');
    this.cameras.main.startFollow(sprite, true, 0.1, 0.1);
    this.cameras.main.setZoom(4);
  }

  public update() {
    const previousVelocity = new Phaser.Math.Vector2(
      sprite.body.velocity.x,
      sprite.body.velocity.y
    );
    const previousAngle =
      (previousVelocity.angle() * Phaser.Math.RAD_TO_DEG) % 360;

    if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
      sprite.body.velocity.y = playerSpeed;
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.down)) {
      sprite.body.velocity.y = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
      sprite.body.velocity.x = playerSpeed;
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.right)) {
      sprite.body.velocity.x = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
      sprite.body.velocity.x = -playerSpeed;
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.left)) {
      sprite.body.velocity.x = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
      sprite.body.velocity.y = -playerSpeed;
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.up)) {
      sprite.body.velocity.y = 0;
    }
    const velocity = new Phaser.Math.Vector2(
      sprite.body.velocity.x,
      sprite.body.velocity.y
    );
    const angle = (velocity.angle() * Phaser.Math.RAD_TO_DEG) % 360;

    // We're moving
    if (velocity.length() > 0) {
      // what direction are we facing?
      // Note see angle() method (+x is 0)
      if (angle < 90) {
        sprite.setFlipX(true);
        sprite.anims.play('walkleft', true);
      } else if (angle < 180) {
        sprite.anims.play('walkdown', true);
      } else if (angle < 270) {
        sprite.setFlipX(false);
        sprite.anims.play('walkleft', true);
      } else {
        sprite.anims.play('walkup', true);
      }
    }
    // We're not moving
    else {
      // ... but we were moving
      if (previousVelocity.length() > 0) {
        // what direction were we facing?
        if (previousAngle < 90) {
          sprite.setFlipX(true);
          sprite.anims.play('faceleft', true);
        } else if (previousAngle < 180) {
          sprite.anims.play('facedown', true);
        } else if (previousAngle < 270) {
          sprite.setFlipX(false);
          sprite.anims.play('faceleft', true);
        } else {
          sprite.anims.play('faceup', true);
        }
      }
    }
  }
}

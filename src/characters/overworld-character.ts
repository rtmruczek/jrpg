import Character from './character';

let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

const playerSpeed = 3;

export default class OverworldCharacter extends Character {
  previousVelocity: Phaser.Math.Vector2;
  previousAngle: number;

  constructor(
    scene: Phaser.Scene,
    locationX: number,
    locationY: number,
    texture: string,
    animData: AnimationConfig[]
  ) {
    super(scene, locationX, locationY, texture, animData);

    this.setActive(true);

    scene.events.addListener(
      'OverworldState.OS_BattleTransition',
      this.handleBattleTransition,
      this
    );

    this.anims.play('facedown');

    cursors = scene.input.keyboard.createCursorKeys();
  }

  private handleBattleTransition() {
    this.setActive(false);
    this.setVelocity(0, 0);
  }

  private updateMovement() {
    if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
      this.setVelocityY(playerSpeed);
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.down)) {
      this.setVelocityY(0);
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
      this.setVelocityX(playerSpeed);
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.right)) {
      this.setVelocityX(0);
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
      this.setVelocityX(-playerSpeed);
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.left)) {
      this.setVelocityX(0);
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
      this.setVelocityY(-playerSpeed);
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.up)) {
      this.setVelocityY(0);
    }
  }

  private updateAnimations() {
    const velocity = new Phaser.Math.Vector2(
      this.body.velocity.x,
      this.body.velocity.y
    );
    const angle = (velocity.angle() * Phaser.Math.RAD_TO_DEG) % 360;

    // We're moving
    if (velocity.length() > 0) {
      // what direction are we facing?
      // Note see angle() method (+x is 0)
      if (angle < 90) {
        this.setFlipX(true);
        this.anims.play('walkleft', true);
      } else if (angle < 180) {
        this.anims.play('walkdown', true);
      } else if (angle < 270) {
        this.setFlipX(false);
        this.anims.play('walkleft', true);
      } else {
        this.anims.play('walkup', true);
      }
    }
    // We're not moving
    else {
      // ... but we were moving
      if (this.previousVelocity.length() > 0) {
        // what direction were we facing?
        if (this.previousAngle < 90) {
          this.setFlipX(true);
          this.anims.play('faceleft', true);
        } else if (this.previousAngle < 180) {
          this.anims.play('facedown', true);
        } else if (this.previousAngle < 270) {
          this.setFlipX(false);
          this.anims.play('faceleft', true);
        } else {
          this.anims.play('faceup', true);
        }
      }
    }
  }

  public preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.previousVelocity = new Phaser.Math.Vector2(
      this.body.velocity.x,
      this.body.velocity.y
    );
    this.previousAngle =
      (this.previousVelocity.angle() * Phaser.Math.RAD_TO_DEG) % 360;

    this.updateMovement();
    this.updateAnimations();
  }
}

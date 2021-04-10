let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

const playerSpeed = 100;

export default class GirlCharacter extends Phaser.Physics.Arcade.Sprite {
  previousVelocity: Phaser.Math.Vector2;
  previousAngle: number;

  constructor(scene: Phaser.Scene) {
    super(scene, 2200, 2250, 'girlsheet');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setSize(this.body.width, this.body.height * 0.75);
    this.body.setOffset(0, this.height * 0.25);

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
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }

  private updateMovement() {
    if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
      this.body.velocity.y = playerSpeed;
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.down)) {
      this.body.velocity.y = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
      this.body.velocity.x = playerSpeed;
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.right)) {
      this.body.velocity.x = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
      this.body.velocity.x = -playerSpeed;
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.left)) {
      this.body.velocity.x = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
      this.body.velocity.y = -playerSpeed;
    }
    if (Phaser.Input.Keyboard.JustUp(cursors.up)) {
      this.body.velocity.y = 0;
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

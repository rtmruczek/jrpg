import Character from './character';

let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

const playerSpeed = 3;

enum CardinalDirection {
  CD_East,
  CD_South,
  CD_West,
  CD_North,
  CD_None,
}

function getCardinalDirectionByAngle(angle: number): CardinalDirection {
  let direction = CardinalDirection.CD_None;

  switch (angle) {
    case 0:
      direction = CardinalDirection.CD_East;
      break;

    case 90:
      direction = CardinalDirection.CD_South;
      break;

    case 180:
      direction = CardinalDirection.CD_West;
      break;

    case 270:
      direction = CardinalDirection.CD_North;
      break;
  }

  return direction;
}

export default class OverworldCharacter extends Character {
  private pinDirection: CardinalDirection;

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

    this.pinDirection = CardinalDirection.CD_South;
    this.anims.play('facedown');

    cursors = scene.input.keyboard.createCursorKeys();
  }

  private handleBattleTransition() {
    this.setActive(false);
    this.setVelocity(0, 0);
  }

  private updateMovement() {
    let velocityX = 0,
      velocityY = 0;

    if (cursors.down.isDown) {
      velocityY += playerSpeed;
    }
    if (cursors.up.isDown) {
      velocityY += -playerSpeed;
    }
    if (cursors.left.isDown) {
      velocityX += -playerSpeed;
    }
    if (cursors.right.isDown) {
      velocityX += playerSpeed;
    }

    this.setVelocity(velocityX, velocityY);
  }

  private updateAnimations() {
    const velocity = new Phaser.Math.Vector2(
      this.body.velocity.x,
      this.body.velocity.y
    );
    const angle = (velocity.angle() * Phaser.Math.RAD_TO_DEG) % 360;
    const newPinDirection = getCardinalDirectionByAngle(angle);
    const state = velocity.length() > 0 ? 'walk' : 'face';

    if (velocity.length() > 0) {
      if (newPinDirection != CardinalDirection.CD_None) {
        this.pinDirection = newPinDirection;
      }
    }

    switch (this.pinDirection) {
      case CardinalDirection.CD_East:
        this.setFlipX(true);
        this.anims.play(`${state}left`, true);
        break;

      case CardinalDirection.CD_South:
        this.anims.play(`${state}down`, true);
        break;

      case CardinalDirection.CD_West:
        this.setFlipX(false);
        this.anims.play(`${state}left`, true);
        break;

      case CardinalDirection.CD_North:
        this.anims.play(`${state}up`, true);
        break;
    }
  }

  public preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.updateMovement();
    this.updateAnimations();
  }
}

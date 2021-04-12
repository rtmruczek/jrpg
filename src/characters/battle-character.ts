import Character from './character';

export default class BattleCharacter extends Character {
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

    // TODO: determine by facing direction
    this.play('faceleft');
  }
}

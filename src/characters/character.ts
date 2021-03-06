import { bootstrapAnimations } from '../utils';

export default class Character extends Phaser.Physics.Matter.Sprite {
  constructor(
    scene: Phaser.Scene,
    locationX: number,
    locationY: number,
    texture: string,
    animData: AnimationConfig[]
  ) {
    super(scene.matter.world, locationX, locationY, texture);

    bootstrapAnimations(scene, animData, texture);

    scene.add.existing(this);
    scene.matter.world.add(this);

    this.setActive(false);
    this.setIgnoreGravity(true);
    this.setFixedRotation();
    this.setBounce(0);
  }

  static preloadCharacterByConfig(
    scene: Phaser.Scene,
    config: CharacterConfig
  ) {
    scene.load.spritesheet(
      config.texture,
      config.spritesheet,
      config.spritesheetConfig
    );
  }
}

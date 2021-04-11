type AnimationConfig = {
  key: string;
  frames: number[];
  repeat?: number;
  frameRate?: number;
};

type CharacterConfig = {
  texture: string;
  spritesheet: string;
  spritesheetConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig;
  animationData: AnimationConfig[];
};

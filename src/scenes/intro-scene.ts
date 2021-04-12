import { game } from '../main';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'intro',
};

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload() {}

  public create() {
    const backgroundRect = this.add.rectangle(
      0,
      0,
      this.scale.width,
      this.scale.height,
      0xffffff,
      0
    );
    // HACKHACK: Incorrect scale at start?
    //  in order to fill the area, display size needs to be 2 * scaleSize
    //  scale height/width work properly for text below
    backgroundRect.setDisplaySize(this.scale.width, this.scale.height * 2);

    const text = this.add.text(0, 0, 'TODO: Title', {
      font: '72px Courier',
      fill: '#afafaf',
    });
    text.setPosition(this.scale.width / 2 - text.getBounds().right / 2, 30);
    text.alpha = 0;

    const fadeIn = this.tweens.create({
      targets: backgroundRect,
      fillAlpha: 1,
      duration: 750,
      paused: true,
    });

    // placeholder intro animation
    fadeIn.on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
      text.alpha = 1;

      this.time.delayedCall(1000, () => {
        this.scene.start('overworld');
      });
    });

    fadeIn.play();
  }
}

import { game } from '../main';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'intro',
};

const title = 'TODO: Title';
const begin = 'Press Enter to Begin.';

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

    const titleText = this.add.text(0, 0, title, {
      font: '72px Courier',
      fill: '#afafaf',
    });
    titleText.setPosition(
      this.scale.width / 2 - titleText.getBounds().right / 2,
      30
    );
    titleText.alpha = 0;

    const startText = this.add.text(0, 0, begin, {
      font: '24px Helvetica',
      fill: '#afafaf',
    });
    startText.setPosition(
      this.scale.width / 2 - startText.getBounds().right / 2,
      this.scale.height - (startText.getBounds().bottom + 80)
    );
    startText.alpha = 0;

    const fadeIn = this.tweens.create({
      targets: backgroundRect,
      fillAlpha: 1,
      duration: 750,
      paused: true,
    });

    const enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    // allow user to skip animation by pressing enter
    enterKey.addListener('down', () => {
      // remove the skip handler, replace with start overworld handler
      enterKey.removeAllListeners('down');

      titleText.alpha = 1;
      startText.alpha = 1;
      fadeIn.stop(1);

      enterKey.addListener('down', this.startGame, this);
    });

    // placeholder intro animation
    fadeIn.on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
      titleText.alpha = 1;

      this.time.delayedCall(1000, () => {
        // if user didn't skip the animation, remove skip handler
        // replace with start overworld handler
        enterKey.removeAllListeners('down');

        this.tweens
          .create({
            targets: startText,
            alpha: 1,
            ease: 'sine.inout',
            yoyo: true,
            duration: '1500',
            repeat: -1,
          })
          .play();

        enterKey.addListener('down', this.startGame, this);
      });
    });

    fadeIn.play();
  }

  public startGame() {
    this.scene.start('overworld');
  }
}

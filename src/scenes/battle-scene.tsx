import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Window, { Position } from '../ui/Window';
import data from '../data/animations/girl';
import { bootstrapAnimations } from '../utils';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'battle',
};

export default class BattleScene extends Phaser.Scene {
  enterKey: Phaser.Input.Keyboard.Key;
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
    this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    bootstrapAnimations(this, data, 'girlsheet');
    this.physics.add
      .sprite(850, 400, 'spritesheet')
      .setDebug(false, false, 0)
      .play('faceleft');
    this.cameras.main.setZoom(4);

    ReactDOM.render(<BattleUI />, document.getElementById('content'));
  }

  public update() {
    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.scene.start('overworld');
    }
  }
}

const BattleUI: React.FC = () => {
  return <Window position={Position.BottomRight}>This is a test</Window>;
};

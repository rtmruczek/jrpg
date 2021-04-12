import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Window, { Position } from '../ui/Window';
import girlCharacterConfig from '../data/characters/girl';
import BattleCharacter from '../characters/battle-character';

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
    BattleCharacter.preloadCharacterByConfig(this, girlCharacterConfig);
  }

  public create() {
    this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    const character = new BattleCharacter(this, 850, 400, 
      girlCharacterConfig.texture, girlCharacterConfig.animationData);

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

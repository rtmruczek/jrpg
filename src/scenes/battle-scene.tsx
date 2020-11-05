import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Window, { Position } from '../ui/Window';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

const playerSpeed = 100;

export default class OverworldScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  create() {
    ReactDOM.render(<BattleUI />, document.getElementById('content'));
  }
}

const BattleUI: React.FC = () => {
  return <Window position={Position.BottomLeft}>This is a test</Window>;
};

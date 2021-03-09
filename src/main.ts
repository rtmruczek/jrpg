import * as Phaser from 'phaser';
import OverworldScene from './scenes/overworld-scene';
import BattleScene from './scenes/battle-scene';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',

  type: Phaser.AUTO,

  scale: {
    width: 1440,
    height: 900,
  },

  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },

  render: {
    pixelArt: true,
  },
  parent: 'game',
  scene: OverworldScene,
  backgroundColor: '#333333',
};

export const game = new Phaser.Game(gameConfig);

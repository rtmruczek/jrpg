import * as Phaser from 'phaser';
import OverworldScene from './scenes/overworld-scene';
import BattleScene from './scenes/battle-scene';
import IntroScene from './scenes/intro-scene';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',

  type: Phaser.AUTO,

  scale: {
    width: 1440,
    height: 900,
  },

  physics: {
    default: 'matter',
    arcade: {
      debug: true,
    },
  },

  render: {
    pixelArt: true,
  },
  parent: 'game',
  scene: [IntroScene, OverworldScene, BattleScene],
  backgroundColor: '#00000',
};

export const game = new Phaser.Game(gameConfig);

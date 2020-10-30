import * as Phaser from 'phaser';
import { GameScene } from './initial-scene';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',

  type: Phaser.AUTO,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
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
  scene: GameScene,
  backgroundColor: '#333333',
};

export const game = new Phaser.Game(gameConfig);

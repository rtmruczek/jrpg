const animations: AnimationConfig[] = [
  {
    key: 'facedown',
    frames: [0],
  },
  {
    key: 'faceleft',
    frames: [1],
  },
  {
    key: 'faceup',
    frames: [2],
  },
  {
    key: 'walkdown',
    frameRate: 6,
    frames: [16, 0, 32, 0],
    repeat: -1,
  },
  {
    key: 'walkleft',
    frameRate: 6,
    frames: [17, 1, 33, 1],
    repeat: -1,
  },
  {
    key: 'walkup',
    frameRate: 6,
    frames: [18, 2, 34, 2],
    repeat: -1,
  },
];

export default animations;

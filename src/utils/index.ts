export function loadMap(
  scene: Phaser.Scene,
  tilesetUrl: string,
  tiledataUrl: string
) {
  scene.load.image('tiles', 'assets/watertiles-extruded.png');
  scene.load.tilemapTiledJSON('worldmap', 'assets/worldmap.json');
}

export function getMap(scene: Phaser.Scene) {
  const map = scene.make.tilemap({ key: 'worldmap' });
  const tileset = map.addTilesetImage('watertiles', 'tiles', 32, 32, 1, 2);
  map.createStaticLayer(0, tileset, 0, 0);
  return map;
}

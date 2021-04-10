import data from "../data/animations/girl";
import { bootstrapAnimations } from "../utils";
import GirlCharacter from "../characters/girl-character";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "overworld",
};

let sprite: Phaser.GameObjects.Sprite;
let map: Phaser.Tilemaps.Tilemap;

export default class OverworldScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.load.image("tiles", "assets/watertiles-extruded.png");
    this.load.tilemapTiledJSON("worldmap", "assets/worldmap.json");

    this.load.spritesheet("girlsheet", "assets/girlsheet.png", {
      frameWidth: 16,
      frameHeight: 32,
    });
  }

  public create() {
    map = this.make.tilemap({ key: "worldmap" });
    const tileset = map.addTilesetImage("watertiles", "tiles", 32, 32, 1, 2);
    map.createStaticLayer(0, tileset, 0, 0);

    bootstrapAnimations(this, data, "girlsheet");

    sprite = new GirlCharacter(this);
    this.cameras.main.startFollow(sprite, true, 0.1, 0.1);
    this.cameras.main.setZoom(4);
  }

  public update() {}
}

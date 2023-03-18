import girlCharacterConfig from "../data/characters/girl";
import OverworldCharacter from "../characters/overworld-character";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "overworld",
};

enum OverworldState {
  OS_Play,
  OS_BattleTransition,
}

let character: Phaser.GameObjects.Sprite;
let map: Phaser.Tilemaps.Tilemap;

export default class OverworldScene extends Phaser.Scene {
  distanceFromLastEncounterRoll: number = 0;
  overworldState: OverworldState = OverworldState.OS_Play;
  collisionLayer: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.load.audio("overworld", "assets/music/overworldpianoflute.mp3");
    this.load.image("tiles", "assets/watertiles-extruded.png");
    this.load.tilemapTiledJSON("worldmap", "assets/worldmap.json");

    OverworldCharacter.preloadCharacterByConfig(this, girlCharacterConfig);
  }

  public create() {
    this.sound.play("overworld", { loop: true });
    map = this.make.tilemap({ key: "worldmap" });
    const tileset = map.addTilesetImage("watertiles", "tiles", 32, 32, 1, 2);

    this.collisionLayer = map.createLayer(0, tileset, 0, 0);
    this.collisionLayer.setCollisionFromCollisionGroup();
    this.matter.world.convertTilemapLayer(this.collisionLayer);
    this.matter.world.setBounds(map.widthInPixels, map.heightInPixels);

    character = new OverworldCharacter(
      this,
      2200,
      2250,
      girlCharacterConfig.texture,
      girlCharacterConfig.animationData
    );

    this.cameras.main.startFollow(character, true, 0.1, 0.1);
    this.cameras.main.setZoom(4);
  }

  // refactor ->> "Battle / Encounter" System should determine this
  private shouldEnterBattle() {
    // distance player should move between rolls
    const stepDistance = 1000;

    // chance of encounter per step (0.01% increments)
    const encounterChance = 1;

    const characterVelocity = new Phaser.Math.Vector2(
      character.body.velocity.x,
      character.body.velocity.y
    );
    this.distanceFromLastEncounterRoll += characterVelocity.length();

    // if we haven't  moved enough to roll
    if (this.distanceFromLastEncounterRoll < stepDistance) {
      // dont roll, dont enter battle
      return false;

      // otherwise ...
    } else {
      // reset distance counter, roll
      this.distanceFromLastEncounterRoll = 0;
      const roll = Phaser.Math.Between(1, 10000);
      return encounterChance <= roll;
    }
  }

  private updatePlay() {
    //this.physics.collide(character, this.collisionLayer);

    if (this.shouldEnterBattle()) {
      // refactor ->> move to separate ts module, export event name
      // events/overworld/BATTLE_TRANSITION
      this.events.emit("OverworldState.OS_BattleTransition");

      this.overworldState = OverworldState.OS_BattleTransition;

      // refactor ->> this should be data driven
      // e.g., TransitionAnimation { [Animations/Effects], NextScene };

      // flash and zoom out
      this.cameras.main.addListener(
        Phaser.Cameras.Scene2D.Events.ZOOM_COMPLETE,
        (): void => {
          // then zoom in and fade to black
          this.cameras.main.addListener(
            Phaser.Cameras.Scene2D.Events.ZOOM_COMPLETE,
            (): void => {
              // then enter battle scene
              this.scene.start("battle");
            }
          );
          this.cameras.main.fade();
          this.cameras.main.zoomTo(7, 200);
        }
      );
      this.cameras.main.zoomTo(2, 350);
      this.cameras.main.flash();
    }
  }

  private updateTransition() {}

  public update() {
    switch (this.overworldState) {
      case OverworldState.OS_Play:
        this.updatePlay();
      case OverworldState.OS_BattleTransition:
        this.updateTransition();
    }
  }
}

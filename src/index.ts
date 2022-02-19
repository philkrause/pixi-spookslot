import * as PIXI from 'pixi.js';
import Reel from './components/reel/reel';
import Spin from './components/spin/spin'
import util from 'util'
import { config } from '../config/config';
import { Application, Loader, Texture, AnimatedSprite, Sprite, Container } from "pixi.js";
import "./style.css";
import { Stage } from '@pixi/layers';

declare const VERSION: string;

const { gameWidth, gameHeight, reelOneOutcome } = config;

console.log(`Apocalypse Slot ${VERSION}`);

function createApplication(): Application {
  const app = new Application({
    backgroundColor: 0xA6C3D4,
    width: gameWidth,
    height: gameHeight
  });

  //Resize
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.stage.scale.x = window.innerWidth / gameWidth;
  app.stage.scale.y = window.innerHeight / gameHeight;

  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.scale.x = window.innerWidth / gameWidth;

    console.log(`innerheight: ${window.innerHeight}`)
    app.stage.scale.y = window.innerHeight / gameHeight;

  });
  return app;
}

function setup() {
  let sheet = PIXI.Loader.shared.resources["./assets/cell-assets/resizeCellSheet.json"].spritesheet;
  return sheet
}

async function loadGameAssets(): Promise<void> {
  return new Promise((res, rej) => {
    const loader = Loader.shared;
    loader.add("./assets/cell-assets/resizeCellSheet.json").load(setup)
    loader.onComplete.once(() => { res(); });
    loader.onError.once(() => { rej(); });
    loader.load();
  });
}

function render(app: PIXI.Application) {
  document.body.appendChild(app.view);
}

window.onload = async (): Promise<void> => {
  await loadGameAssets();
  const app = createApplication();
  
  const loader = Loader.shared;
  const spin = new Spin(config, app.ticker);
  //console.log(`Selected cellllsl: ${Spin}`)

  const allCells = spin.createContainerofAllCells()
  //Create Container of all the cells
  spin.spinner(() => {
  });

  // reel_one.spin(3, config.reelSpinningSpeedFactor, () => {
  //   reel_one.areSpinning()
  // });
  app.stage.addChild(allCells)
  render(app);
};


//ANIMATION
// function getCell(): AnimatedSprite {
//   const cell = new AnimatedSprite([
//     Texture.from("cell_01.png"),
//     Texture.from("cell_02.png"),
//     Texture.from("cell_03.png"),
//     Texture.from("cell_04.png"),
//     Texture.from("cell_05.png"),
//     Texture.from("cell_06.png"),
//     Texture.from("cell_07.png"),
//     Texture.from("cell_08.png"),
//     Texture.from("cell_09.png"),
//     Texture.from("cell_09.png"),
//     Texture.from("cell_10.png"),
//     Texture.from("cell_11.png"),
//     Texture.from("cell_12.png")
//   ]);

// cell.loop = true;
// cell.animationSpeed = .8;
// //cell.play();
// cell.scale.set(.2);

// return cell;
// }
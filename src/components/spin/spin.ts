import * as PIXI from 'pixi.js';
import Reel from '../reel/reel';
import { Texture, Sprite, Container, Ticker, Loader } from "pixi.js";
import { ConfigInterface } from '../../../config/contract';


class Spin extends PIXI.Container {
  
  protected alltheCells: Sprite[] = [];
  protected totalReels: number;
  protected spinningSpeedFactor: number;
  protected useEasyMode: boolean = false;
  protected spinning = false;
  protected shuffleSpinningSpeedFactor: boolean;
  protected rolledDiceOutcome: number = -1;
  protected cells: Sprite[];
  protected config: ConfigInterface;
  static selectedCells: any[];

  constructor(config: ConfigInterface, ticker: PIXI.Ticker) {

    super();
    let cells = []
    const cellJack: Sprite = new Sprite(Texture.from("cell_01.png"));
    const cellQueen: Sprite = new Sprite(Texture.from("cell_02.png"));
    const cellKing: Sprite = new Sprite(Texture.from("cell_03.png"));
    const cellAce: Sprite = new Sprite(Texture.from("cell_04.png"));
    const cellEye: Sprite = new Sprite(Texture.from("cell_05.png"));
    const cellBrain: Sprite = new Sprite(Texture.from("cell_06.png"));
    const cellSkull: Sprite = new Sprite(Texture.from("cell_07.png"));
    const cellZombie: Sprite = new Sprite(Texture.from("cell_08.png"));
    const cellGirl: Sprite = new Sprite(Texture.from("cell_09.png"));
    const cellWild: Sprite = new Sprite(Texture.from("cell_10.png"));
    const cellBonus: Sprite = new Sprite(Texture.from("cell_11.png"));

    cells = [
      cellJack,
      cellQueen,
      cellKing,
      cellAce,
      cellEye,
      cellBrain,
      cellSkull,
      cellZombie,
      cellGirl,
      cellWild,
      cellBonus
    ]

    this.cells = cells
    this.totalReels = config.totalReels;
    this.spinningSpeedFactor = config.reelSpinningSpeedFactor;
    this.shuffleSpinningSpeedFactor = config.reelShuffleSpinningSpeedFactor;
    this.position.set(config.reelContainerPosition.x, config.reelContainerPosition.y);
    this.config = config

    Reel.totalCells = config.totalReelCells;
  }
  
  //Constructor END
  spinner(cb: Function) {
    this.spinning = true;
    let spinningReelsNumber = this.totalReels;
    const onStop = () => {
      spinningReelsNumber -= 1;
      if (!spinningReelsNumber) {
        cb();
        this.spinning = false;
        this.checkResults();
      }
    };
    this.rolledDiceOutcome = -1;
    // for (let index = 0; index < this.alltheCells.length; index++) {
      
    //   spinAnimation(this.rolledDiceOutcome, this.spinningSpeedFactor, onStop);
    // }
  }
  //loop through all sprites and create a container
  createContainerofAllCells = (): Container => {
    const container = new Container()
    for (let index = 0; index < this.config.totalReelCells; index ++) {
      //loop through each outcome
      let outcomeValue = this.config.reelOneOutcome[index];

      //new Sprite for each cell
      let sprite: Sprite = this.cells[outcomeValue];
      let newsprite = new Sprite(sprite.texture)
      
      //position setting
      newsprite.position.set(250, index * 80);
      newsprite.scale.set(.5)

      //const reel = new Reel(index, config, ticker);
      
      this.cells[outcomeValue];
      container.addChild(newsprite);
    }
    return container
  }

  areSpinning() {
    return this.spinning;
  }


  protected checkResults(): void {
    // If we have rolled a dice and got lucky, skip checking spinning outcome
    let won = this.rolledDiceOutcome >= 0;
  //   if (!won) {
  //     // Check if all the reels have the same spinning outcome
  //     const outcome = this.alltheCells[0].getSpinningOutcome();
  //     console.log(outcome)
  //     won = this.alltheCells.find((i) => i.getSpinningOutcome() !== outcome) === undefined;
  //   }
  //  if (won) alert('You won!');
  }
}

export default Spin;
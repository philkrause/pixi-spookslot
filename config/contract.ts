export interface ConfigInterface {
  gameWidth: number;
  gameHeight: number;
  minWidth: number;
  minHeight: number;
  reelContainerPosition: { x: number; y: number};
  reelPositionTwo: { x: number; y: number };
  reelPositionThree: { x: number; y: number };
  playButtonPosition: { x: number; y: number };
  selectEasyModePosition: { x: number; y: number };
  FPSDisplayPosition: { x: number; y: number };
  totalReels: number;
  reelSpinningCycles: number;
  reelSpinningSpeedFactor: number;
  reelShuffleSpinningSpeedFactor: boolean;
  totalReelCells: number;
  reelCellHeight: number;
  reelCellWidth: number;
  reelVisibleCells: number;
  reelVerticalPadding: number;
  reelHorizontalMargin: number;
  backgroundHeight: number;
  backgroundPosition: { x: number; y: number }
  backgroundWidth: number;
  backgroundHorizontalMargin: number;
  backgroundVerticalPadding: number;
  reelOneOutcome: number[];
}

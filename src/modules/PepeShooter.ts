import PepeUI from './PepeUI';

export default class PepeShooter {
  private maxPepe: number;
  private pepeUI: PepeUI;

  constructor(maxPepe: number, pepeUI: PepeUI) {
    this.maxPepe = maxPepe;
    this.pepeUI = pepeUI;
  }

  startGame = () => {};
}

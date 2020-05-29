type PepeUITypes = {
  scoreContainer: string;
  startButtonContainer: string;
  backGroundContainer: string;
  pepeImageName: string;
  pepeDeadImageName: string;
};

export default class PepeUI {
  private readonly scoreContainer: HTMLDivElement | null;
  private readonly startButtonContainer: HTMLButtonElement | null;
  private readonly backGroundContainer: HTMLDivElement | null;
  private readonly pepeImageName: string;
  private readonly pepeDeadImageName: string;

  constructor({
    scoreContainer,
    startButtonContainer,
    backGroundContainer,
    pepeImageName,
    pepeDeadImageName,
  }: PepeUITypes) {
    this.scoreContainer = document.querySelector(scoreContainer);
    this.startButtonContainer = document.querySelector(startButtonContainer);
    this.backGroundContainer = document.querySelector(backGroundContainer);
    this.pepeImageName = pepeImageName;
    this.pepeDeadImageName = pepeDeadImageName;
  }

  get container() {
    return {
      score: this.scoreContainer,
      startButton: this.startButtonContainer,
      backGround: this.backGroundContainer,
    };
  }

  get assets() {
    return {
      pepe: this.pepeImageName,
      pepeDead: this.pepeDeadImageName,
    };
  }
}

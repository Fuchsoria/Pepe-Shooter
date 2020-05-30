import PepeUI from './PepeUI';

type PepeShooterTypes = { maxPepe: number; gameTime: number; pepeUI: PepeUI };

export default class PepeShooter {
  private readonly maxPepe: number;
  private readonly gameTime: number;
  private readonly pepeUI: PepeUI;
  private count: number = 0;
  private time: number;
  private gameInterval: number = 0;

  constructor({ maxPepe, gameTime, pepeUI }: PepeShooterTypes) {
    this.maxPepe = maxPepe;
    this.gameTime = gameTime;
    this.pepeUI = pepeUI;
    this.time = gameTime;
  }

  private updateScore() {
    const { score } = this.pepeUI.containers;

    if (score) {
      score.textContent = String(this.count);
    }
  }

  private incrementCounter() {
    this.count += 1;

    this.updateScore();
  }

  private clearCounter() {
    this.count = 0;

    this.updateScore();
  }

  private updateTime() {
    const { time } = this.pepeUI.containers;

    if (time) {
      time.textContent = String(this.time);
    }
  }

  private handleShoot = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('pepe') && !target.classList.contains('pepe_dead')) {
      const id = target.getAttribute('data-id');

      if (id) {
        this.pepeUI.pepeDead({ id });
        this.incrementCounter();
      }

      this.pepeUI.renderPepe();
    }
  };

  addStartHandlers() {
    const { startButton, backGround } = this.pepeUI.containers;

    startButton?.addEventListener('click', this.startGame);
    backGround?.addEventListener('mousedown', this.handleShoot);

    this.updateTime();
  }

  private handleTime = () => {
    this.time -= 1;
    this.updateTime();

    if (this.time <= 0) {
      this.stopGame();
    }
  };

  private startGame = () => {
    this.stopGame();
    this.clearCounter();

    for (let i = 0; i < this.maxPepe; i++) {
      this.pepeUI.renderPepe();
    }

    this.gameInterval = setInterval(() => {
      this.handleTime();
    }, 1000);
  };

  private stopGame = () => {
    clearInterval(this.gameInterval);
    this.time = this.gameTime;
    this.updateTime();
    this.pepeUI.removeAllPepe();
  };
}

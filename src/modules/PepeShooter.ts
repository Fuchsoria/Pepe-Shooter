import PepeUI from './PepeUI';

type PepeShooterTypes = { maxPepe: number; pepeUI: PepeUI };

export default class PepeShooter {
  private readonly maxPepe: number;
  private readonly pepeUI: PepeUI;

  constructor({ maxPepe, pepeUI }: PepeShooterTypes) {
    this.maxPepe = maxPepe;
    this.pepeUI = pepeUI;
  }

  handleShoot = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('pepe') && !target.classList.contains('pepe_dead')) {
      const id = target.getAttribute('data-id');
      
      console.log(id, target);
    }
  };

  addStartHandlers() {
    const { startButton, backGround } = this.pepeUI.containers;

    startButton?.addEventListener('click', this.startGame);
    backGround?.addEventListener('click', this.handleShoot);
  }

  startGame = () => {
    const { backGround } = this.pepeUI.containers;

    this.pepeUI.removeAllPepe();
    console.log(this.maxPepe, this.pepeUI, backGround);
    this.pepeUI.renderPepe();
    this.pepeUI.renderPepe();
    this.pepeUI.renderPepe();
  };
}

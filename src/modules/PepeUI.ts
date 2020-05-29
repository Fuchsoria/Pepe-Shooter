import { v4 as uuid } from 'uuid';

type PepeUITypes = {
  scoreContainer: string;
  startButtonContainer: string;
  backGroundContainer: string;
  timeContainer: string;
  pepeImageName: string;
  pepeDeadImageName: string;
};

type Pepe = {
  id: string;
  element: HTMLImageElement;
  animation?: Animation;
};

export default class PepeUI {
  private readonly scoreContainer: HTMLSpanElement | null;
  private readonly startButtonContainer: HTMLButtonElement | null;
  private readonly backGroundContainer: HTMLDivElement | null;
  private readonly timeContainer: HTMLSpanElement | null;
  private readonly pepeImageName: string;
  private readonly pepeDeadImageName: string;
  private pepePool: Pepe[] = [];

  constructor({
    scoreContainer,
    startButtonContainer,
    backGroundContainer,
    timeContainer,
    pepeImageName,
    pepeDeadImageName,
  }: PepeUITypes) {
    this.scoreContainer = document.querySelector(scoreContainer);
    this.startButtonContainer = document.querySelector(startButtonContainer);
    this.backGroundContainer = document.querySelector(backGroundContainer);
    this.timeContainer = document.querySelector(timeContainer);
    this.pepeImageName = pepeImageName;
    this.pepeDeadImageName = pepeDeadImageName;
  }

  get containers() {
    return {
      score: this.scoreContainer,
      startButton: this.startButtonContainer,
      backGround: this.backGroundContainer,
      time: this.timeContainer,
    };
  }

  get assets() {
    return {
      pepe: this.pepeImageName,
      pepeDead: this.pepeDeadImageName,
    };
  }

  get randomStartPosition() {
    const top = Math.floor(Math.random() * Math.floor(80) + 5);
    const left = Math.floor(Math.random() * Math.floor(90) + 5);

    return { top, left };
  }

  get randomMove() {
    const number = Math.floor(Math.random() * Math.floor(80) + 5);

    return number;
  }

  get pepePoolLength() {
    return this.pepePool.length;
  }

  addPepeInPool({ id, element, animation }: Pepe) {
    this.pepePool.push({ id, element, animation });
  }

  removePepeFromPool({ id }: { id: string }) {
    this.pepePool = this.pepePool.filter((pepe) => pepe.id !== id);
  }

  createNewPepe() {
    const id = uuid();
    const startPosition = this.randomStartPosition;
    const element = document.createElement('img');
    element.src = `./assets/images/${this.pepeImageName}`;
    element.classList.add('pepe');
    element.setAttribute('data-id', id);
    element.style.top = `${startPosition.top}%`;
    element.style.left = `${startPosition.left}%`;

    const animation = element.animate(
      [
        {
          top: `${this.randomMove}%`,
          left: `${this.randomMove}%`,
        },
        {
          top: `${this.randomMove}%`,
          left: `${this.randomMove}%`,
        },
        {
          top: `${this.randomMove}%`,
          left: `${this.randomMove}%`,
        },
        {
          top: `${this.randomMove}%`,
          left: `${this.randomMove}%`,
        },
        {
          top: `${this.randomMove}%`,
          left: `${this.randomMove}%`,
        },
      ],
      { iterations: Infinity, direction: 'alternate', easing: 'linear', fill: 'both', duration: 5000 }
    );

    this.addPepeInPool({ id, element, animation });

    return element;
  }

  removePepe = ({ id }: { id: string }) => {
    const pepe = this.pepePool.find((pepe) => pepe.id === id);

    if (pepe) {
      pepe.element.remove();
      pepe.animation?.cancel();
      this.removePepeFromPool({ id: pepe.id });
    }
  };

  pepeDead = ({ id }: { id: string }) => {
    const pepe = this.pepePool.find((pepe) => pepe.id === id);

    if (pepe) {
      pepe.element.classList.add('pepe_dead');
      pepe.element.src = `./assets/images/${this.pepeDeadImageName}`;
      pepe.animation?.pause();

      setTimeout(() => this.removePepe({ id: pepe.id }), 1500);
    }
  };

  removeAllPepe = () => {
    this.pepePool.forEach((pepe) => {
      this.removePepe({ id: pepe.id });
    });

    if (this.backGroundContainer) {
      this.backGroundContainer.innerHTML = '';
    }
  };

  renderPepe = () => {
    const pepe = this.createNewPepe();

    this.backGroundContainer?.appendChild(pepe);
  };
}

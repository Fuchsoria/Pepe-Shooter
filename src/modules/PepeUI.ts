import { v4 as uuid } from 'uuid';

type PepeUITypes = {
  scoreContainer: string;
  startButtonContainer: string;
  backGroundContainer: string;
  pepeImageName: string;
  pepeDeadImageName: string;
};

type Pepe = {
  id: string;
  element: HTMLImageElement;
};

export default class PepeUI {
  private readonly scoreContainer: HTMLDivElement | null;
  private readonly startButtonContainer: HTMLButtonElement | null;
  private readonly backGroundContainer: HTMLDivElement | null;
  private readonly pepeImageName: string;
  private readonly pepeDeadImageName: string;
  private pepePool: Pepe[] = [];

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

  get containers() {
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

  addPepeInPool({ id, element }: Pepe) {
    this.pepePool.push({ id, element });
  }

  removePepeFromPool({ id }: { id: string }) {
    this.pepePool = this.pepePool.filter((pepe) => pepe.id !== id);
  }

  createNewPepe() {
    const id = uuid();
    const element = document.createElement('img');
    element.src = `./assets/images/${this.pepeImageName}`;
    element.classList.add('pepe');
    element.setAttribute('data-id', id);

    this.addPepeInPool({ id, element });

    return element;
  }

  removePepe = ({ id }: { id: string }) => {
    const pepe = this.pepePool.find((pepe) => pepe.id === id);

    if (pepe) {
      pepe.element.remove();
      this.removePepeFromPool({ id: pepe.id });
    }
  };

  removeAllPepe =() => {
    this.pepePool.forEach((pepe) => {
      this.removePepe({ id: pepe.id });
    });

    if (this.backGroundContainer) {
      this.backGroundContainer.innerHTML = '';
    }
  };

  renderPepe() {
    const pepe = this.createNewPepe();

    this.backGroundContainer?.appendChild(pepe);
  }
}

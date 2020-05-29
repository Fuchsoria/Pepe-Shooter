import PepeShooter from './modules/PepeShooter';
import PepeUI from './modules/PepeUI';

document.addEventListener('DOMContentLoaded', () => {
  const ui = new PepeUI({
    scoreContainer: '.info__score',
    startButtonContainer: '.info__start',
    backGroundContainer: '.background',
    pepeImageName: 'pepe-first.png',
    pepeDeadImageName: 'pepe-second.png',
  });

  const shooter = new PepeShooter({ maxPepe: 5, pepeUI: ui });
  
  shooter.addStartHandlers();
});

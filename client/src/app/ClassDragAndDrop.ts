import DOMHelper from './helpers/DOMHelper';
import Initialize from './interfaces/Initialize';

export default class DragAndDrop implements Initialize {
  public currentCard: HTMLElement | null;

  public columns: NodeListOf<HTMLElement>;

  public cards: NodeListOf<HTMLElement>;

  private hoveredStyle: string;

  constructor(
    currentCard: HTMLElement | null = null,
    columns: NodeListOf<HTMLElement> = document.querySelectorAll('.column'),
    cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card'),
    hoveredStyle: string = 'hovered',
  ) {
    this.currentCard = currentCard;
    this.columns = columns;
    this.cards = cards;
    this.hoveredStyle = hoveredStyle;
  }

  public initialize(): void {
    this.collectedItems();
    this.createSubscriptionsEvents();
  }

  public collectedItems(): void {
    this.currentCard = null;
    this.columns = document.querySelectorAll('.column');
    this.cards = document.querySelectorAll('.card');
  }

  private createSubscriptionsEvents(): void {
    this.columns.forEach((column: HTMLElement) => {
      column.addEventListener('mousedown', (event: Event) => {
        const target = event.target as HTMLElement;

        const card = DOMHelper.getParentElement(target, 'card') as HTMLElement;

        if (card) {
          this.currentCard = document.getElementById(card.id);
          this.currentCard!.addEventListener('dragstart', () => {          
            if (target.dataset.text === 'tooltip') {
              target.classList.add('hide');
            }
            this.onDragStart();
          });
          this.currentCard!.addEventListener('dragend', () => {
            if (target.dataset.text === 'tooltip') {
              target.classList.remove('hide');
            }
            this.onDragend();
          });
        }
      });
    });

    this.columns!.forEach((column: HTMLElement) => {
      column.addEventListener('dragover', (event) => event.preventDefault());
      column.addEventListener('dragenter', (event) => {
        event.preventDefault();
        column.classList.add(this.hoveredStyle);
      });
      column.addEventListener('dragleave', () => column.classList.remove('hovered'));
      column.addEventListener('drop', (event) => this.onDragDrop(event));
    });
  }

  private onDragStart(): void {
    const delay = setTimeout(() => this.currentCard?.classList.add('hide'), 5);
    clearTimeout(delay);
  }

  private onDragend(): void {
    const delay = setTimeout(() => this.currentCard?.classList.remove('hide'), 5);
    clearTimeout(delay);
  }

  private onDragDrop(event: Event): void {
    const currentColumn = DOMHelper.getParentElement(event.target as HTMLElement, 'column') as HTMLElement;

    currentColumn.append(this.currentCard as HTMLElement);
    currentColumn.classList.remove('hovered');
  }
}

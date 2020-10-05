import RenderTickets from './RenderTickets';

import Ticket from './interfaces/Ticket';
import Initialize from './interfaces/Initialize';
import FiltrationService from './services/FiltrationService';

enum FilterStatus {
  notSorted,
  sortedByDateASC,
  sortedByDateDESC,
  sortedByAssigneASC,
  sortedByAssigneDESC,
}

enum ToggleClasses {
  arrowDown = 'fa-arrow-down',
  arrowUp = 'fa-arrow-up',
}

enum Constants {
  sortButton = 'btn-sorting-date',
  assigneeButton = 'btn-sorting-assignee',
}

export default class FiltrationView implements Initialize {
  private status: FilterStatus;

  private readonly dateSortButton = document.getElementById(Constants.sortButton);

  private readonly assigneSortButton = document.getElementById(Constants.assigneeButton);

  public dataToRender: Ticket[] = [];

  public constructor(
    private filtrationService: FiltrationService,
    private renderTicket: RenderTickets,
  ) {
    this.status = FilterStatus.notSorted;
  }

  public initialize(): void {
    this.filterByAssigne();
    this.filterByDate();
  }

  private filterByAssigne(): void {
    this.assigneSortButton!.addEventListener('click', () => this.filterByAssigneeHandler());
  }

  private filterByDate(): void {
    this.dateSortButton!.addEventListener('click', () => this.filterByDateHandler());
  }

  private async filterByAssigneeHandler(): Promise<void> {
    if (
      this.status !== FilterStatus.sortedByAssigneASC
      && this.status !== FilterStatus.sortedByAssigneDESC
    ) {
      await this.filtrationService.sortBy('assignee', true);
      this.dataToRender = this.filtrationService.tickets!;
      this.status = FilterStatus.sortedByAssigneASC;
      this.toggleFilterTypeChange(this.assigneSortButton!, this.dateSortButton!);
      this.renderTicket.renderTickets(this.dataToRender);
    } else if (this.status === FilterStatus.sortedByAssigneASC) {
      await this.filtrationService.sortBy('assignee', false);
      this.dataToRender = this.filtrationService.tickets!;
      this.status = FilterStatus.sortedByAssigneDESC;
      this.toggleFilterOrderChange(
        this.assigneSortButton!,
        ToggleClasses.arrowUp,
        ToggleClasses.arrowDown,
      );
      this.renderTicket.renderTickets(this.dataToRender);
    } else {
      await this.filtrationService.sortBy('assignee', true);
      this.dataToRender = this.filtrationService.tickets!;
      this.status = FilterStatus.sortedByAssigneASC;
      this.toggleFilterOrderChange(
        this.assigneSortButton!,
        ToggleClasses.arrowDown,
        ToggleClasses.arrowUp,
      );
      this.renderTicket.renderTickets(this.dataToRender);
    }
  }

  private async filterByDateHandler(): Promise<void> {
    if (
      this.status !== FilterStatus.sortedByDateASC
      && this.status !== FilterStatus.sortedByDateDESC
    ) {
      await this.filtrationService.sortBy('dueDate', true);
      this.dataToRender = this.filtrationService.tickets!;
      this.status = FilterStatus.sortedByDateASC;
      this.toggleFilterTypeChange(this.dateSortButton!, this.assigneSortButton!);
      this.renderTicket.renderTickets(this.dataToRender);
    } else if (this.status === FilterStatus.sortedByDateASC) {
      await this.filtrationService.sortBy('dueDate', false);
      this.dataToRender = this.filtrationService.tickets!;
      this.status = FilterStatus.sortedByDateDESC;
      this.toggleFilterOrderChange(
        this.dateSortButton!,
        ToggleClasses.arrowUp,
        ToggleClasses.arrowDown,
      );
      this.renderTicket.renderTickets(this.dataToRender);
    } else {
      await this.filtrationService.sortBy('dueDate', true);
      this.dataToRender = this.filtrationService.tickets!;
      this.status = FilterStatus.sortedByDateASC;
      this.toggleFilterOrderChange(
        this.dateSortButton!,
        ToggleClasses.arrowDown,
        ToggleClasses.arrowUp,
      );
      this.renderTicket.renderTickets(this.dataToRender);
    }
  }

  private toggleFilterTypeChange(
    elementToAddClass: HTMLElement,
    elementToRemoveClass: HTMLElement,
  ): void {
    elementToAddClass.children[0]!.classList.add(ToggleClasses.arrowDown);
    elementToRemoveClass.children[0]!.classList.remove(
      ToggleClasses.arrowDown,
      ToggleClasses.arrowUp,
    );
  }

  private toggleFilterOrderChange(
    changedElement: HTMLElement,
    classToAdd: string,
    classToRemove: string,
  ): void {
    changedElement.children[0]!.classList.replace(classToRemove, classToAdd);
  }
}

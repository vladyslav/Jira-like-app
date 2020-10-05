import { defaultQueryParams } from './Config';
import Initialize from './interfaces/Initialize';
import TicketService from './services/TicketService';
import RenderTikes from './RenderTickets';

export default class ClientPagination extends RenderTikes implements Initialize {
  public page: number;

  private recordsPerPage?: number;

  private totalRecordsCount?: number;

  private navContainer!: HTMLElement | null;

  private allPages?: NodeListOf<HTMLElement>;

  private prevBtn: HTMLButtonElement | undefined;

  private nextBtn: HTMLButtonElement | undefined;

  private select: HTMLSelectElement | undefined;

  constructor(private ticketService: TicketService) {
    super();
    this.page = parseInt(defaultQueryParams.page, 10);
  }

  public async initialize() {
    this.navContainer = document.querySelector('.nav-container');
    this.select = document.querySelector('#select') as HTMLSelectElement;
    await this.getClassFields();
    await this.requestAndRender(this.recordsPerPage!, this.page);

    this.createNav();
    this.getAllWidgetElements();
    this.initEvents();
    this.setWidgetState(this.recordsPerPage!, this.totalRecordsCount!);
  }

  private async getClassFields(): Promise<void> {
    const paginatedData = await this.ticketService.getTickets(defaultQueryParams);

    this.recordsPerPage = paginatedData.perPage;
    this.totalRecordsCount = paginatedData.totalCount;
  }

  private async requestAndRender(perPage: number, page: number): Promise<void> {
    const localPerPage = perPage.toString();
    const localPage = page.toString();
    const query = { ...defaultQueryParams, perPage: localPerPage, page: localPage };

    const paginatedData = await this.ticketService.getTickets(query);

    this.renderTickets(paginatedData.data);
  }

  private createNodeElement(
    element: string,
    nameClass: string,
    textContent: string | number,
    parentNode: HTMLElement,
    location: string,
    disabled?: string,
    id?: string,
    value?: number,
  ) {
    const domElement = document.createElement(element);
    domElement.setAttribute('class', nameClass);
    domElement.setAttribute('disabled', disabled!);
    domElement.setAttribute('value', `${value! + 1}`);
    domElement.id = id!;

    // eslint-disable-next-line no-unused-expressions
    typeof textContent === 'string'
      ? (domElement.innerHTML = textContent)
      : (domElement.innerHTML = `${textContent + 1}`);

    this.arrangeButtons(domElement, parentNode, location);
  }

  private arrangeButtons(domElement: HTMLElement, parentNode: HTMLElement, location: string) {
    // eslint-disable-next-line no-unused-expressions
    location === 'prepend' ? parentNode.prepend(domElement) : parentNode.append(domElement);
  }

  private getAllWidgetElements(): void {
    this.allPages = document.querySelectorAll('.nav-item');
    this.allPages[0].classList.add('active-li');

    this.prevBtn = document.querySelector('#prev') as HTMLButtonElement;
    this.nextBtn = document.querySelector('#next') as HTMLButtonElement;
  }

  private getNumberPages(): number {
    return Math.ceil(this.totalRecordsCount! / this.recordsPerPage!);
  }

  private setActiveClass(element: HTMLElement, nodeList: NodeListOf<HTMLElement>): void {
    nodeList.forEach((item) => {
      item.classList.remove('active-li');
    });
    element.classList.add('active-li');
  }

  private createNav(): void {
    const page = this.getNumberPages();

    for (let i = 0; i < page; i += 1) {
      this.createNodeElement('LI', 'nav-item', i, this.navContainer!, 'append', '', undefined, i);
    }

    this.createNodeElement(
      'BUTTON',
      'nav-btn',
      '<< Prev',
      this.navContainer!,
      'prepend',
      'disabled',
      'prev',
    );
    this.createNodeElement(
      'BUTTON',
      'nav-btn',
      'Next >>',
      this.navContainer!,
      'append',
      '',
      'next',
    );
  }

  private setWidgetState(currentPage: number, lengthPages: number): void {
    if (this.allPages!.length === 1) {
      this.navContainer!.innerHTML = '';
    }

    if (currentPage === 1) {
      this.prevBtn!.disabled = true;
    } else {
      this.prevBtn!.disabled = false;
    }

    if (currentPage === lengthPages) {
      this.nextBtn!.disabled = true;
    } else {
      this.nextBtn!.disabled = false;
    }
  }

  widgetBehavior(
    element: HTMLElement,
    page: number,
    recordsPerPage: number,
    allPages: NodeListOf<HTMLElement>,
  ): void {
    this.setWidgetState(page, allPages!.length);
    this.requestAndRender(recordsPerPage, page);

    this.setActiveClass(element, allPages);
  }

  private initEvents(): void {
    this.page = 1;

    this.allPages!.forEach((page: HTMLElement) => {
      page.addEventListener('click', () => {
        this.page = (page as HTMLLIElement).value;
        this.widgetBehavior(page, this.page, this.recordsPerPage!, this.allPages!);
      });
    });

    this.prevBtn!.addEventListener('click', () => {
      this.page -= 1;

      this.widgetBehavior(
        this.allPages![this.page - 1],
        this.page,
        this.recordsPerPage!,
        this.allPages!,
      );
    });

    this.nextBtn!.addEventListener('click', () => {
      this.page += 1;

      this.widgetBehavior(
        this.allPages![this.page - 1],
        this.page,
        this.recordsPerPage!,
        this.allPages!,
      );
    });

    this.select!.addEventListener('change', () => {
      this.recordsPerPage = parseInt(this.select!.value, 10);

      this.navContainer!.innerHTML = '';

      this.requestAndRender(this.recordsPerPage!, this.page);

      this.createNav();
      this.getAllWidgetElements();
      this.initEvents();

      this.setWidgetState(this.page, this.allPages!.length);
    });
  }
}

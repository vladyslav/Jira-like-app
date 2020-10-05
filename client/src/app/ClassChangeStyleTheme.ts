import Initialize from './interfaces/Initialize';

export default class ChangeStyleTheme implements Initialize {
  private linkTheme: HTMLElement | null;

  private checkboxToggleTheme: HTMLInputElement | null;

  constructor() {
    this.checkboxToggleTheme = document.querySelector('#toggleTheme');
    this.linkTheme = document.querySelector('#theme');
  }

  public initialize(): void {
    this.setDefaultTheme();
    this.checkboxToggleTheme!.addEventListener('change', (): void => {
      this.setLocalStorageState(this.checkboxToggleTheme!.checked);
      this.toggleTheme();
    });
  }

  private setDefaultTheme(): void {
    const state = this.getLocalStorageState();
    if (state === 'true') {
      this.checkboxToggleTheme!.checked = true;
    }
    this.toggleTheme();
  }

  private setLocalStorageState(state: boolean): void {
    localStorage.setItem('toggle', (state as unknown) as string);
  }

  private getLocalStorageState(): string {
    return localStorage.getItem('toggle') || 'false';
  }

  private toggleTheme(): void {
    const state = this.getLocalStorageState();
    if (state !== 'false') {
      return this.linkTheme!.setAttribute('href', './style/styleDarkTheme.css');
    }
    return this.linkTheme!.removeAttribute('href');
  }
}

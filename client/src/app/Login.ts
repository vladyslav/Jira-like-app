import Initialize from './interfaces/Initialize';

export default class Login implements Initialize {
  private cookieButton: HTMLElement | null;

  private loginPage: HTMLElement | null;

  private container: HTMLElement | null;

  private loginForm: HTMLFormElement | null;

  private registerForm: HTMLFormElement | null;

  private loginButton: HTMLElement | null;

  private registerButton: HTMLElement | null;

  private ghostSignUpButton: HTMLElement | null;

  private ghostSignInButton: HTMLElement | null;

  private loginContainer: HTMLElement | null;

  private error: HTMLElement | null;

  private againButton: HTMLElement | null;

  constructor() {
    this.container = document.getElementById('container');
    this.error = document.getElementById('error');

    this.loginPage = document.getElementById('login-page');
    this.loginContainer = document.getElementById('login-container');

    this.loginForm = document.getElementById('login-form') as HTMLFormElement;
    this.registerForm = document.getElementById('register-form') as HTMLFormElement;

    this.loginButton = document.getElementById('login');
    this.registerButton = document.getElementById('register');

    this.cookieButton = document.getElementById('deleteCookie');
    this.againButton = document.getElementById('again');

    this.ghostSignUpButton = document.getElementById('ghost-signUp');
    this.ghostSignInButton = document.getElementById('ghost-signIn');
  }

  private cookieCheck(): void {
    if (document.cookie.indexOf('COOKIE')) {
      this.container!.classList.toggle('hide');
    } else {
      this.loginPage!.classList.toggle('hide');
    }
  }

  private errorCheck(): void {
    if (!document.cookie.indexOf('ERROR')) {
      this.error!.classList.toggle('hide');
      this.loginPage!.classList.add('hide');
      this.container!.classList.add('hide');
    }
    this.againButton!.addEventListener('click', () => {
      document.cookie = 'ERROR=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
      window.location.reload();
    });
  }

  private deleteCookie(): void {
    this.cookieButton!.addEventListener('click', () => {
      document.cookie = 'COOKIE=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
      window.location.reload();
    });
  }

  private toggleMode() {
    this.ghostSignUpButton!.addEventListener('click', () => {
      this.loginContainer!.classList.add('right-panel-active');
    });

    this.ghostSignInButton!.addEventListener('click', () => {
      this.loginContainer!.classList.remove('right-panel-active');
    });
  }

  private login() {
    this.loginButton!.addEventListener('click', () => {
      this.loginForm!.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        this.loginForm!.setAttribute('method', 'post');
        this.loginForm!.setAttribute('action', 'http://localhost:3333/login');
        this.loginForm!.submit();
      });
    });
  }

  private register() {
    this.registerButton!.addEventListener('click', () => {
      this.registerForm!.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        this.registerForm!.setAttribute('method', 'post');
        this.registerForm!.setAttribute('action', 'http://localhost:3333/register');
        this.registerForm!.submit();
      });
    });
  }

  initialize() {
    this.toggleMode();
    this.cookieCheck();
    this.errorCheck();
    this.login();
    this.register();
    this.deleteCookie();
  }
}

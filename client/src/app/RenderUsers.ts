import RenderHelper from './helpers/RenderHelper';
import User from './interfaces/User';

export default class RenderUsers {
  constructor(private users: User[], private root: string) {
    this.users = users;
    this.root = root;
    this.renderUsers(this.users, this.root);
  }

  renderUsers(users: User[], root: string): void {
    const rootDOMEl: HTMLDivElement | null = document.querySelector(`.${root}`);

    let result = '';

    users.forEach((user) => {
      result += RenderHelper.generateUser(user);
    });
    rootDOMEl!.innerHTML = result;
  }
}

import { apiURL } from '../Config';
import User from '../interfaces/User';

export default class UserService {
  private readonly userURL = `${apiURL}users`;

  public async getUsers(): Promise<User[]> {
    const request = await fetch(this.userURL);

    return request.json();
  }

  public async getUser(id: string): Promise<User | null> {
    const request = await fetch(`${this.userURL}${id}`);

    return request.json();
  }
}

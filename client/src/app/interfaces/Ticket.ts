import User from './User';

export default interface Ticket {
  _id?: string;
  title: string;
  description: string | undefined;
  dueDate: Date | undefined;
  estimatedTime: string | undefined;
  creator?: User | undefined;
  assignee?: User | undefined;
  createdAt: Date;
  progress: string | undefined;
}

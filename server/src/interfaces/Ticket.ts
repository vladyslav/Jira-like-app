export default interface Tickets {
  id: string;
  title: string;
  description: string | undefined;
  dueDate: any;
  estimatedTime: number | undefined;
  creator: string;
  assignee: string | undefined;
  createdAt: Date;
  progress: string | undefined;
}

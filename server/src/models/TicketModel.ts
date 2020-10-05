import { Schema, model, Document } from 'mongoose';

import Tickets from '../interfaces/Ticket';

const ticketSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    dueDate: { type: Date, required: false },
    estimatedTime: { type: Number, required: false },
    creator: { type: Schema.Types.ObjectId, ref: 'user' },
    assignee: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, required: false },
    progress: { type: String, required: false },
  },
  {
    versionKey: false,
  },
);

const ticketModel = model<Tickets & Document>('ticket', ticketSchema);

export default ticketModel;

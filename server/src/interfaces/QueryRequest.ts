import { Request } from 'express';

import QueryBody from './QueryBody';

export default interface QueryRequest extends Request<any, any, QueryBody, any> {
  query: QueryBody;
}

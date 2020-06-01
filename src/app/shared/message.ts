import {Severity} from './models/enum/severity';

export interface Message {
  title?: string;
  content: string;
  severity: Severity;
}

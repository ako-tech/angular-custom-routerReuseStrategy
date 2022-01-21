import { Observable } from 'rxjs';

export interface Tab {
  url: string;
  title: string;
  dirty$?: Observable<boolean>;
}

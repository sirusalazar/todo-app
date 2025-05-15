import { FormControl } from '@angular/forms';

export interface TodoForm {
  title: FormControl<string>;
  dueDate: FormControl<Date | null>;
}

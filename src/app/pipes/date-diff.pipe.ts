import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateDiff',
})
export class DateDiffPipe implements PipeTransform {
  transform(dateStr: string): string {
    if (!dateStr || dateStr === '') {
      return '';
    }
    return moment(dateStr).fromNow();
  }
}

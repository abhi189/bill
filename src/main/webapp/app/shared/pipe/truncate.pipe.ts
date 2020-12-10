/**
 * Created by dmaure on 05/06/19.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit = 5, ellipsis = '...') {
        // Cut the email address in $limit amount of characters after @
        return `${value.substring(0, value.indexOf('@') + limit)}${ellipsis}`;
    }
}

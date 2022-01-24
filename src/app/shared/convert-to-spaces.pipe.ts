import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converToSpaces'
})

export class ConvertToSpacesPipe implements PipeTransform {
  transform(value: string, charater: string): string {
    return value.replace(charater, ' ');
  }
}
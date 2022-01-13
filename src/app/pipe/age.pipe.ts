import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any): any {
    let currentYear = new Date().getFullYear();
    let dob = new Date(value).getFullYear();
    let age = currentYear - dob;
    return age;
  }

}

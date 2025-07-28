import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFlyCase'
})
export class CanFlyCasePipe implements PipeTransform {

  transform(value: boolean): "Puede Volar" | "No Puede Volar" {
    return value ? "Puede Volar" : "No Puede Volar";
  }

}

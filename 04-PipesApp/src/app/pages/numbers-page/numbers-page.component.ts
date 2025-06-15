import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  imports: [DecimalPipe, PercentPipe, CurrencyPipe],
  templateUrl: './numbers-page.component.html',
})
export class NumbersPageComponent {
  totalSells      = signal<number>(1_234_567.8456);
  decimalPipeExp  = signal<string>("{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}");
  percent         = signal<number>(0.2578);
}

import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { LocaleService } from '../../services/locale.service';
import { localeType } from '../../interfaces/locale.interface';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: `./basic-page.component.html`,
})
export class BasicPageComponent {
  // injections
  localeService = inject(LocaleService);

  // signals
  nameLower   = signal('john doe');
  nameUpper   = signal('JOHN DOE');
  fullName    = signal('JoHn DoE');

  customDate  = signal(new Date());

  currentLocale = signal(inject(LOCALE_ID));

  tickingDateEffect = effect((onCleanUp) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
      console.log('Date updated:', this.customDate());
    }, 1000);

    onCleanUp(() => {
      clearInterval(interval);
      console.log('Date effect cleaned up');
    });
  });

  changeLocale(locale: localeType) {
    this.localeService.changeLocale(locale);
    console.log('Locale changed to:', locale);
  }
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryServiceService } from '../../services/country-service.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { LoadingGifComponent } from '../../../shared/components/loading-gif/loading-gif.component';
import { CountryInformationComponent } from './country-information/country-information.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, LoadingGifComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryServiceService)

  countryRsource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.code);
    }
  });

}

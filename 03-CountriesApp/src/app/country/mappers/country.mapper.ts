import { RestCountry } from "../interfaces/country.interface";
import { Country } from "../interfaces/custom-country.interface";

export class CountryMapper {
   // static RestCountry => Country
   static mapRestCountryToCountry(restCountry: RestCountry): Country {
      return {
         capital: restCountry.capital?.join(","),
         cca2: restCountry.cca2,
         flag: restCountry.flag,
         flagSvg: restCountry.flags.svg,
         name: restCountry.translations['spa'].common ?? 'Sin nombre',
         population: restCountry.population,
         region: restCountry.region,
         subregion: restCountry.subregion ?? 'Sin subregión',
      };
   }
   // static RestCountry => Country[]

   static mapRestCountriesToCountries(restCountries: RestCountry[]): Country[] {
      return restCountries.map((country) =>
         this.mapRestCountryToCountry(country)
      );
   }
}

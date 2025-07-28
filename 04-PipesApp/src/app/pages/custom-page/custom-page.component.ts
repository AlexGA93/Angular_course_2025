import { Component, signal } from "@angular/core";
import { ToggleCasePipe } from "../../pipes/toggle-case.pipe";
import { heroes } from "../../data/hero.data";
import { CanFlyCasePipe } from "../../pipes/can-fly-case.pipe";
import { HeroColorPipe } from "../../pipes/hero-color.pipe";
import { HeroTextColorPipe } from "../../pipes/hero-text-color.pipe";
import { TitleCasePipe } from "@angular/common";
import { HeroCreatorPipe } from "../../pipes/hero-creator.pipe";
import { HeroSortByPipe } from "../../pipes/hero-sort-by.pipe";
import { Hero } from "../../interfaces/hero.interface";
import { HeroFilterPipe } from "../../pipes/hero-filter.pipe";

@Component({
   selector: "app-custom-page",
   imports: [
      ToggleCasePipe,
      CanFlyCasePipe,
      HeroColorPipe,
      HeroTextColorPipe,
      TitleCasePipe,
      HeroCreatorPipe,
      HeroSortByPipe,
      HeroFilterPipe
   ],
   templateUrl: "./custom-page.component.html",
})
export class CustomPageComponent {
   name = signal("Alex");
   uppercase = signal(true);
   heroes = signal(heroes);
   sortBy = signal<keyof Hero | null>(null);
   searchQuery= signal<string>("");

   public toggleText() {
      this.uppercase.set(!this.uppercase());
   }
}
